from django.db import models

# Create your models here.
class Category(models.Model):
    category_id=models.AutoField(primary_key=True)
    category_name=models.CharField( max_length=50)
     
    def __str__(self):
        return self.category_name
    

class Product(models.Model):
    VEHICLE_CHOICES = [
        ('two wheeler', 'Two Wheeler'),
        ('four wheeler', 'Four Wheeler'),
    ]
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description =models.CharField( max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_CHOICES,default='Two Wheeler')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    picture = models.ImageField(upload_to='product_images/', blank=True, null=True)
    quantity = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.vehicle_type})"