from django.urls import path, include
from .views import *
urlpatterns = [
    path('login',Login.as_view()),
    path('signup',Signup.as_view()),
    path('logout',Logout.as_view()),
    path('get-user',GetUser.as_view())
]
