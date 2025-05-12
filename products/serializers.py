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
    class Meta:
        model = Product
        fields = '__all__'

class ProductAdminManagerSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.category_name')

    class Meta:
        model = Product
        fields = '__all__'
