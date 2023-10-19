from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User

class Userserializers(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__' 
        
    def validate_email(self, value):
        # Custom email validation logic
        if not value.endswith('@gmail.com'):
            raise serializers.ValidationError("Email must be from gmail.com")
        return value

        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    
    
class Userlistserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','last_name','email']