from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Userserializers, Userlistserializers
from .models import User
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.authtoken.models import Token

@api_view(['GET', 'POST'])
def home(request):
    if request.method == 'GET':
        return Response({"message": "Hello, GET world!"})
    elif request.method == 'POST':
        return Response({"message": "Hello, post world!"})

@api_view(['POST'])
def post_user(request):
    try:
        data = request.data
        existing_user = User.objects.filter(email=data.get('email')).first()

        if existing_user:
            return Response({'status': False, 'message': 'Email already registered'}, status=status.HTTP_409_CONFLICT)

        serializer = Userserializers(data=data)

        if serializer.is_valid():
            # Hash the password before saving it to the database
            hashed_password = make_password(serializer.validated_data['password'])
            serializer.validated_data['password'] = hashed_password
            serializer.save()

            return Response({'status': True, 'message': 'User registered successfully'})
        return Response({'status': False, 'message': serializer.errors})
    except Exception as e:
        print(e)
        return Response({'status': False, 'message': 'Invalid error'})

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = User.objects.filter(email=email).first()

    if user and check_password(password, user.password):
        return Response({'message': 'Login successfully'})
    return Response({'message': 'Invalid credentials'})

@api_view(['GET'])
def list_users(request):
    users = User.objects.all()
    serializer = Userlistserializers(users, many=True)
    return Response({'users': serializer.data})

