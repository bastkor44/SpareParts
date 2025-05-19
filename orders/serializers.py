from rest_framework import serializers
from .models import CartItem
from .models import Notification
from .models import Order, OrderItem,Wishlist
from django.contrib.auth import get_user_model
from .models import Product  # If Product is defined in the same app



class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['product_name', 'price', 'quantity']



class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'is_read', 'created_at']




class OrderSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    address = serializers.CharField(source='user.profile.address', read_only=True)  # assuming profile has address
    phone = serializers.CharField(source='user.profile.phone', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'product', 'product_name', 'quantity', 'amount',
            'status', 'updated_date', 'username', 'email', 'address', 'phone'
        ]
        read_only_fields = ['id', 'user', 'product_name', 'updated_date', 'username', 'email', 'address', 'phone', 'amount']

class WishlistSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_image = serializers.ImageField(source='product.image', read_only=True)  # Optional
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())  # Adding product field

    class Meta:
        model = Wishlist
        fields = ['product', 'product_name', 'product_image']
