from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import User


# Create your views here.

def index(request):
    return render(request, 'index.html')


class Signup(APIView):

    serializer_class = Signup_serializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            queryset = User.objects.filter(username=username)
            if queryset.exists():
                return Response({'msg': 'Username already taken'}, status=status.HTTP_226_IM_USED)

            if User.objects.filter(email=email).exists():
                return Response({'msg': 'Email already exists'}, status=status.HTTP_226_IM_USED)

            else:
                user = User(username=username, email=email, password=password)
                user.save()
                self.request.session['is_admin'] = False
                self.request.session['username'] = username
                return Response({'msg': 'created successfully'}, status=status.HTTP_201_CREATED)

        else:
            return Response({'msg': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):

    serializer_class = Login_serializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            queryset = User.objects.filter(username=username)
            if queryset.exists():

                password_check = queryset[0].password == password
                if password_check:
                    self.request.session['is_admin'] = queryset[0].is_admin
                    self.request.session['username'] = username
                    return Response({'msg': "logged in successfully"}, status=status.HTTP_200_OK)

                else:
                    return Response({"msg": "Enter the correct password"}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'msg': "Username doesn't exists"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class GetUser(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        username = self.request.session.get('username')
        is_admin = self.request.session.get('is_admin')

        data = {
            'is_admin': is_admin,
            'username': username,
        }

        return Response(data, status=status.HTTP_200_OK)


class Logout(APIView):
    def get(self, request, format=None):
        self.request.session.pop('username')
        self.request.session.pop('is_admin')

        return Response({'msg': 'loged out successfully'})
