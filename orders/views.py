from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CartItem
from products.models import Product
from .serializers import CartItemSerializer
from django.utils import timezone
from rest_framework import viewsets, permissions
from rest_framework.permissions import BasePermission
from .models import Order
from .serializers import OrderSerializer
from rest_framework.decorators import action
from .models import Wishlist
from .serializers import WishlistSerializer
from .models import Product  # If Product is defined in the same app


class IsAdminOrManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.role == 'manager' or request.user.role == 'admin')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    prod_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)

    try:
        product = Product.objects.get(product_id=prod_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    cart_item, created = CartItem.objects.get_or_create(
        user=user,
        product=product,
        defaults={'quantity': quantity}
    )

    if not created:
        cart_item.quantity += int(quantity)
        cart_item.save()

    return Response({
        'message': 'Product added to cart'
    }, status=status.HTTP_200_OK)
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user, is_selected=True)

    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):
    if request.user.role not in ['admin', 'manager']:
        return Response({'error': 'Not authorized'}, status=403)

    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

    new_status = request.data.get('order_status')
    if new_status not in ['Pending', 'Shipped', 'Delivered']:
        return Response({'error': 'Invalid status'}, status=400)

    if order.order_status == new_status:
        return Response({'message': 'Order status is already set to this value'}, status=200)

    order.order_status = new_status
    order.updated_date = timezone.now().date()  # ✅ Just the date
    order.save()

    Notification.objects.create(
        user=order.user,
        message=f"Your order #{order.id} has been {new_status.lower()} on {formatted_date}."
    )

    return Response({'message': 'Order status updated and notification sent'}, status=200)


class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product_id = self.request.data.get('product')  # Get the product ID from the request
        if Wishlist.objects.filter(user=self.request.user, product_id=product_id).exists():
            raise serializers.ValidationError("This product is already in your wishlist.")
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['delete'], url_path='remove')
    def remove_from_wishlist(self, request, pk=None):
        print(f"User: {request.user}, Trying to delete Wishlist ID: {pk}")
        try:
            wishlist_item = Wishlist.objects.get(id=pk, user=request.user)
            wishlist_item.delete()
            return Response({'message': 'Item removed from wishlist.'}, status=status.HTTP_204_NO_CONTENT)
        except Wishlist.DoesNotExist:
            return Response({'error': 'Item not found in wishlist.'}, status=status.HTTP_404_NOT_FOUND)




class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('user', 'product').all().order_by('-updated_date')
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ['list', 'update', 'partial_update', 'cancel_order', 'set_status']:
            return [permissions.IsAuthenticated()]
        elif self.action in ['admin_orders', 'set_status']:
            return [IsAdminOrManager()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.groups.filter(name='manager').exists():
            return Order.objects.select_related('user', 'product').all().order_by('-updated_date')
        return Order.objects.filter(user=user).select_related('product').order_by('-updated_date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['patch'], url_path='cancel')
    def cancel_order(self, request, pk=None):
        order = self.get_object()
        if order.status not in ['cancelled', 'delivered']:
            order.status = 'cancelled'
            order.save()
            return Response({'detail': 'Order cancelled successfully.'})
        return Response({'detail': 'Order cannot be cancelled.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], url_path='set-status')
    def set_status(self, request, pk=None):
        """Used by admin/manager to update status"""
        if not (request.user.is_staff or request.user.groups.filter(name='manager').exists()):
            return Response({'detail': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)

        order = self.get_object()
        new_status = request.data.get('status')
        if new_status not in dict(Order.ORDER_STATUS_CHOICES):  # Replace with your model field choices
            return Response({'detail': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = new_status
        order.save()
        return Response({'detail': f'Status updated to {new_status}.'})