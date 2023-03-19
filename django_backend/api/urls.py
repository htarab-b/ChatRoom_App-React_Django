from django.urls import path
from .views import *

urlpatterns = [
    path("", IndexView.as_view(), name='index'),
    path("login/", LoginView.as_view(), name='login'),
    path("signup/", SignUpView.as_view(), name='signup'),
    path("users/", UserListView.as_view(), name='userlist'),
    path("message/", MessageView.as_view(), name='message'),
    path("chatroom/", ChatRoomView.as_view(), name='chatroom'),
]
