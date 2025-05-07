from django.urls import path
from .views import add_product
from .views import add_category

urlpatterns = [
    path('add/', add_product, name='add-product'),
    path('add-category/', add_category, name='add-category'),
]
