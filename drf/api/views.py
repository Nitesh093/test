from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Userserializers ,Userlistserializers
from .models import User



@api_view(['GET',"POST"])
def home(request):
    if request.method =='GET':
        
        return Response({"message": "Hello, GET world!"})
    
    elif request.method =='POST':
        
        return Response({"message": "Hello, post world!"})
    
 
 
@api_view(["POST"])
def post_user(request):
    try:
        data = request.data
        print(data)
        
        serializer = Userserializers(data=data)
        
        if serializer.is_valid():
            serializer.save()
            
            print(serializer.data) 
        
            return Response({ 
                'status': True,
                "message": serializer.data
            })
        return Response({  
                'status': False,
                "message": serializer.errors   
            }) 
        
    except Exception as e:  
        print(e)
    return Response({
            'status': False,
            "message": "invalid error"
        })
 
 
@api_view(["POST"])
def Login(request):
    email=request.data.get('email')
    password=request.data.get('password')
    user=User.objects.filter(email=email,password=password)
    if user:
        return Response({'message':'Login succesefully'})
    return Response({'message':'invalid credentials'})




@api_view(['GET'])

def List_users(request):
    users=User.objects.all()
    serializer=Userlistserializers(users,many=True)
    return Response({'users':serializer.data}) 