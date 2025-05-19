from rest_framework import serializers
from .models import Product
from .models import Category

class ProductUserSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.category_name')
    availability = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'picture','category','vehicle_type','availability']
    def get_availability(self, obj):
        if obj.quantity == 0:
            return "Unavailable"
        elif obj.quantity < 5:
            return f"Only {obj.quantity} left"
        return "" 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField()  # Accept category name as input
    category_name = serializers.ReadOnlyField(source='category.category_name')

    class Meta:
        model = Product
        fields = [
            'name',
            'description',
            'category',        # write: category name (string)
            'category_name',   # read: display category name
            'price',
            'picture',
            'quantity',
            'is_active',
            'vehicle_type'
        ]

    def create(self, validated_data):
        category_name = validated_data.pop('category')
        try:
            category = Category.objects.get(category_name=category_name)
        except Category.DoesNotExist:
            raise serializers.ValidationError({'category': 'Category with this name does not exist.'})

        product = Product.objects.create(category=category, **validated_data)
        return product

class ProductAdminManagerSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.category_name')

    class Meta:
        model = Product
        fields = ["product_id","name","category","description","vehicle_type","price","picture","quantity"]
