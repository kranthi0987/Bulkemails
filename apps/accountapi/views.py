from django.contrib.auth import authenticate
# Create your views here.
from rest_framework import generics, status, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from apps.accountapi.Serializer import UserSerializer, UserProfileSerializer, TokenSerializer
import time
from datetime import datetime

# class UserCreate(generics.CreateAPIView):
#     """
#     POST auth/login/
#     """
#     serializer_class = UserProfileSerializer2

class UserCreate(APIView):
    def post(self, request):
        data = request.data
        phone = data.get('phone')
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            obj = serializer.save()
            UserProfiles.objects.filter(user=obj).update(phone=phone)
            return Response({"status": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username", )
        password = request.data.get("password", )
        user = authenticate(username=username, password=password)
        if user:
            return Response({"token": user.auth_token.key})
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class GetUserDetails(APIView):
    def get(self, request):
        try:
            token = request
            user = Token.objects.get(key=token.auth).user
            if user:
                phone = UserProfiles.objects.get(user=user).phone
                return Response({"id": user.id, "fullname": user.first_name + user.last_name, "phone": phone,
                                 "username": user.username, "email": user.email,
                                 "lastlogin": user.last_login, "status": "success"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"status": "failed", "message": "unable to find user"},
                                status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"status": "failed", "message": "server error"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetAllUsers(APIView):
    def get(self, request, format=None):
        UsersJsonArray = []
        try:
            users = User.objects.all()
            for user in users:
                if user:
                    phone = UserProfiles.objects.get(user=user).phone
                    UsersJsonArray.append({"id": user.id, "fullname": user.first_name + user.last_name, "phone": phone,
                                           "username": user.username, "email": user.email,
                                           "lastlogin": user.last_login})
                else:
                    return Response({"status": "failed", "message": "unable to find user"},
                                    status=status.HTTP_400_BAD_REQUEST)
            return Response(UsersJsonArray, status=status.HTTP_200_OK)
        except:
            return Response({"status": "failed", "message": "server error"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Logout(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response({"message": "logged out", "status": "true"}, status=status.HTTP_200_OK)


class GetSystemRunningTime(APIView):
    def get(self, request):
        start_time = datetime.now()
        end_time = datetime.now()
        return Response({"systemtime": end_time - start_time}, status=status.HTTP_200_OK)
