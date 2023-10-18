from .views import *
from django.urls import path 
urlpatterns = [
    path('',home,name="home"),
    path('sign-up/',post_user,name="post_user"),
    path('login/',Login,name="login"),
    path('list-users/',List_users,name="list_user")
    
]
