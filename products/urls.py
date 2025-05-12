from django.urls import path
from .views import add_product
from .views import add_category
from .views import list_products
from .views import edit_product
from .views import list_categories
from .views import delete_product
from .views import detail_product
from .views import filtered_products
from .views import search_products


urlpatterns = [
    path('add/', add_product, name='add-product'),
    path('add-category/', add_category, name='add-category'),
    path('list-product/', list_products, name='list-product'),
    path('edit-product/<int:pk>/', edit_product, name='edit-product'),
    path('detail-product/<int:pk>/', detail_product, name='detail-product'),
    path('list-category/', list_categories, name='list-category'),
    path('delete-product/<int:pk>/', delete_product, name='delete-product'),
    path('filter/', filtered_products, name='filter-products'),
    path('search/', search_products, name='search-products'),
]
