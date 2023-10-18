
from django.db import models


class Base(models.Model):
    
    class Meta:
        abstract =True
  
class User(Base):
    first_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30)
    email=models.EmailField(max_length=50)
    password=models.CharField(max_length=50)

