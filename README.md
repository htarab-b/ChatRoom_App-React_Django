# Chatroom Message Application

## Description

This react-django application is created to create chatrooms and send messages.

## Getting Started

### Installing
* Open terminal in your desired location of installation of local.
* Clone the repository.
```
git clone https://github.com/htarab-b/Django-Shop_Dashboard_App.git
```
* Create a virtual environment. (Optional)
```
python3 -m venv env
```
* Install the requirements for the project in the 'requirements.txt' file.
```
pip install -r requirements.txt
```

### Executing program
* Open VS Code or any IDE.
* Open new terminal and start the django server.
```
python manage.py runserver
```
* Open new terminal and start the react app.
```
npm start
```

## Use App
* Open your react localhost, default : http://localhost:3000/
* Initially, the user has to signup/login
* After logging in, the user will be asked to enter the code for the chatroom.
* If the user doesn't have any code, they can create one and share it with other users so they can join in the chatroom.
* Any number of users can join a chatroom with the code of the respective chatroom
* Not more than one chatroom can have the same chatroom code. Chatroom code is unique.


## Help
Django Admin Superuser :
> Username : admin <br>Password  : adminpassword