from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=16,unique=True)
    email = models.EmailField(unique=True)
    password= models.CharField(max_length=8)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    

    def __str__(self):
        return self.username