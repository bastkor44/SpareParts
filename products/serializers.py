from rest_framework import serializers
from .models import Product
from .models import Category

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name']

class ProductUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'picture', 'price']

class ProductAdminManagerSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.category_name')

    class Meta:
        model = Product
        fields = [
            'product_id', 'name', 'description', 'price', 'picture',
            'quantity', 'is_active', 'created_at', 'updated_at', 'category'
        ]

