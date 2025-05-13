from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('manager', 'Manager'),
        ('user', 'User'),
        ('admin','Admin')
    ]
    phone = models.CharField(max_length=15)
    address = models.TextField()
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
   