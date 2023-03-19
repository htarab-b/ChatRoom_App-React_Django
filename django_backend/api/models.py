from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ChatRoom(models.Model):
    code = models.CharField(max_length=20)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.code
    

class Messages(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=100)
    chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
