from rest_framework import serializers
from .models import User

class Userserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' 
        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    
    
class Userlistserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','last_name','email']