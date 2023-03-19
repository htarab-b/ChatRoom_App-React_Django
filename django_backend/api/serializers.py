from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import ValidationError
from rest_framework.authtoken.models import Token
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = ['__all__']

class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['__all__']

#Authtoken Serializer
class SignupSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=80)
    username = serializers.CharField(max_length=20)
    password = serializers.CharField(min_length=8)

    class Meta:
        model = User
        fields = ["email", "username", "password"]

    def validate(self, attrs):
        flag_email = User.objects.filter(email=attrs['email']).exists()
        if flag_email:
            raise ValidationError("Email already in use")
        flag_username = User.objects.filter(username=attrs['username']).exists()
        if flag_username:
            raise ValidationError("Username already taken")
        return super().validate(attrs)
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
        return user