from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
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
from rest_framework.views import APIView
from decimal import Decimal
from .models import CartItem
from django.shortcuts import get_object_or_404
from .models import OrderItem


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

    def destroy(self, request, *args, **kwargs):
        product_id = kwargs.get('pk')  # assuming you pass product_id in the URL

        if not product_id:
            return Response({"detail": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        wishlist_item = Wishlist.objects.filter(user=request.user, product_id=product_id).first()

        if not wishlist_item:
            return Response({"detail": "Wishlist item not found for this product."}, status=status.HTTP_404_NOT_FOUND)

        wishlist_item.delete()
        return Response({"detail": "Wishlist item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



class PlaceOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        # Get details from user model instead of request
        name = user.username
        address = user.address
        phone_number = user.phone

        if data.get("buy_now"):  # Single product ordering
            product_id = data.get("product_id")
            quantity = int(data.get("quantity", 1))
            product = get_object_or_404(Product, product_id=product_id)
            total_price = product.price * quantity

            order = Order.objects.create(
                user=user,
                total_amount=total_price,
                name=name,
                address=address,
                phone_number=phone_number,
            )
            OrderItem.objects.create(order_id=order, product=product, quantity=quantity, price=product.price)
            return Response({"detail": "Order placed (Buy Now)."}, status=201)

        else:  # From Cart
            cart_item_ids = data.get("cart_item_ids", [])
            cart_items = CartItem.objects.filter(user=user, id__in=cart_item_ids)
            if not cart_items:
                return Response({"detail": "No cart items found."}, status=400)

            total_price = sum([item.product.price * item.quantity for item in cart_items])

            order = Order.objects.create(
                user=user,
                total_amount=total_price,
                name=name,
                address=address,
                phone_number=phone_number,
            )

            for item in cart_items:
                OrderItem.objects.create(
                    order_id=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price
                )
                item.delete()

            return Response({"detail": "Order placed (Cart checkout)."}, status=201)