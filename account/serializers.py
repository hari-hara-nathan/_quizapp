from rest_framework import serializers
from .models import *

class Login_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=16)
    password= serializers.CharField(max_length=8)

class Signup_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=16)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=8)
