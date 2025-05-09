from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import register_user
from .views import LoginView
from .views import update_profile
from .views import delete_profile

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', LoginView, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('update-profile/<int:pk>/', update_profile, name='update-user-by-id'),
    path('delete-profile/<int:pk>/', delete_profile, name='delete-profile'),
]
