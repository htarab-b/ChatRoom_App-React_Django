from django.shortcuts import render
from django.views import generic
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from django.core import serializers


# Create your views here.
class IndexView(generic.ListView):
    def get(self, request):
        return HttpResponse("Hello Index")

class SignUpView(generics.GenericAPIView):
    serializer_class = SignupSerializer
    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            response = {"message": "User created successfully"}

            return Response(data=response, status=status.HTTP_201_CREATED)
        
        return Response(data=serializer.errors)
    
class LoginView(APIView):
    def get(self, request: Request):
        content = {
            "user": str(request.user),
            "auth": str(request.auth)
        }
        return Response(data=content, status=status.HTTP_200_OK)
    
    def post(self, request: Request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            response = {
                "message": "Login Successful",
                "token": user.auth_token.key
            }
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            response = {
                "error": "Invalid credentials"
            }
            return Response(data=response)
        
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class ChatRoomView(generics.GenericAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        chatroom_data = []
        chatrooms = ChatRoom.objects.all()
        for chatroom in chatrooms:
            chatroom_data.append({'code': chatroom.code, 'owner': chatroom.owner.username})
        return Response(data=chatroom_data)

    def post(self, request: Request):
        code = request.data.get('code')
        user = Token.objects.get(key=request.data.get('user')).user
        flag_chatroom = ChatRoom.objects.filter(code=code).exists()
        if flag_chatroom:
            response = {
                "error": "Code already taken"
            }
        else:
            ChatRoom.objects.create(owner=user, code=code)
            response = {
                "message": "Chatroom created successfully"
            }
        return Response(data=response)
    
class MessageView(generics.GenericAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request: Request):
        chatroom = ChatRoom.objects.filter(code=request.query_params['chatroom_code'])
        if chatroom.exists():
            message_data = []
            messages = Messages.objects.filter(chatroom=chatroom.first())
            for message in messages:
                message_data.append({'sender': message.sender.username, 'message': message.message})
            return Response(data=message_data)
        else:
            response = {
                "error": "Chatroom code invalid"
            }
            return Response(data=response)
    
    def post(self, request: Request):
        code = request.data.get('chatroom_code')
        message = request.data.get('message')
        user = Token.objects.get(key=request.data.get('user')).user
        Messages.objects.create(chatroom=ChatRoom.objects.get(code=code), message=message, sender=user)
        response = {
            "message": "Message sent to chatroom"
        }
        return Response(data=response)