from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Product, Category
from .serializers import ProductSerializer
from .serializers import CategorySerializer 
from rest_framework.permissions import BasePermission
from .serializers import ProductUserSerializer, ProductAdminManagerSerializer, CategorySerializer
from django.db.models import Q

class IsAdminOrManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.role == 'manager' or request.user.role == 'admin')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product(request):
    if request.user.role != 'manager':
        return Response({'error': 'Only managers can add products.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Product added successfully'}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_product(request, pk):
    user = request.user

    # Allow only admin or manager
    if user.role not in ['admin', 'manager']:
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductAdminManagerSerializer(product, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Product updated successfully', 'product': serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminOrManager])
def add_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Category added successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_products(request):
    user = request.user
    products = Product.objects.all()

    if user.role == 'user':
        serializer = ProductUserSerializer(products, many=True)
    elif user.role in ['admin', 'manager']:
        serializer = ProductAdminManagerSerializer(products, many=True)
    else:
        return Response({'error': 'Invalid role'}, status=403)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_categories(request):
    if request.user.role in ['admin', 'manager']:
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    return Response({'detail': 'You do not have permission to view categories.'}, status=403)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminOrManager])
def delete_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        product.delete()
        return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detail_product(request, pk):
    user = request.user
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    if user.role == 'user':
        serializer = ProductUserSerializer(product)
    elif user.role in ['admin', 'manager']:
        serializer = ProductAdminManagerSerializer(product)
    else:
        return Response({'error': 'Invalid role'}, status=403)

    return Response(serializer.data)


@api_view(['GET'])
def filtered_products(request):
    vehicle_type = request.GET.get('vehicle_type')
    category = request.GET.get('category')  # e.g., 'interior'
    price_range = request.GET.get('price_range')  # 'below_300', 'above_300', or 'all'

    products = Product.objects.all()

    if vehicle_type:
        products = products.filter(vehicle_type__iexact=vehicle_type)

    if category:
        products = products.filter(category__category_name__iexact=category)

    if price_range == 'below_300':
        products = products.filter(price__lt=300)
    elif price_range == 'above_300':
        products = products.filter(price__gte=300)

    serializer = ProductUserSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def search_products(request):
    query = request.GET.get('q', '')  # search keyword
    products = Product.objects.filter(
        Q(name__icontains=query) |
        Q(category__category_name__icontains=query)
    )
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)