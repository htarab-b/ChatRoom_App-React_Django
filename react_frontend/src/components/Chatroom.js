import './Chatroom.css';
import { useEffect, useState } from "react";
import { useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Chatroom() {
    const navigate = useNavigate();

    const query = new URLSearchParams(window.location.search);
    const chatroom_code = query.get('code')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('../login', {replace: true});
        }
        if (!chatroom_code) {
            navigate('../', {replace: true});
        }
    });

    const [messages, setMessages] = useState([]);

    const {register, handleSubmit} = useForm();

    function GetMessages() {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
        };
        fetch(`http://127.0.0.1:8000/api/message/?chatroom_code=${chatroom_code}`, requestOptions)
            .then(response => response.json())
            .then((response) => {
                setMessages(response);
            });
    }

    useEffect(() => {GetMessages()});

    const rendermessage = () => {
        let messagelist = [];
        messages.forEach(message => {
            messagelist.push(<div class='text'><b>{message.sender}: </b> {message.message} <br/></div>)
        });
        return messagelist;
    }

    function sendMessage(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    "chatroom_code": chatroom_code,
                    "message": data.message,
                    "user": localStorage.getItem('token')
                }
            )
        };
        fetch('http://127.0.0.1:8000/api/message/', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.message) {
                    console.log(data.message);
                    document.getElementById('sendmessage').reset();
                }
            });
    }

    return (
        <div class='body'>
            <h2>{chatroom_code}</h2>
            <div class='chatbox'>
                <div class='message'>
                    {rendermessage()}
                </div>
                <form id='sendmessage' autoComplete='off' onSubmit={handleSubmit(sendMessage)}>
                    <input {...register('message', {
                        required: true
                    })}></input>
                    <center><input type='submit' value='Send'></input></center>
                </form>
            </div>
        </div>
    )
}

export default Chatroom;