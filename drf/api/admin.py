from django.contrib import admin
from .models import User

# Register your models here.
from api.models import User
class UserAdmin(admin.ModelAdmin):
    list_display=('first_name','last_name',"email","password")
    search_fields=('first_name',)
    



admin.site.register(User,UserAdmin)

