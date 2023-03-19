import './Home.css';
import { useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function CreateRoom() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login', {replace: true});
        }
    });

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    "code": data.code,
                    "user": localStorage.getItem('token')
                }
            )
        };
        fetch("http://127.0.0.1:8000/api/chatroom/", requestOptions)
            .then(response => response.json())
            .then((request) => {
                if (request.error) {
                    setError(request.error);
                    console.log(request.error);
                }
                else {
                    console.log(request);
                    navigate(`/chatroom/?code=${data.code}`, { replace: true });
                }
            });
    }

    return (
        <div class='body'>
            <div class='codeform'>
            <center><label>{error}</label></center>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Create Your Chatroom</h2>
                    <label>Enter Code for your Chatroom</label><input {...register('code', {
                        required: "Code cannot be empty"
                    })}></input>
                    <p>{errors.code?.message}</p>
                    <center><input type='submit' value='Enter'></input></center>
                    <br/><center><label class='redirect'><Link to="../">Join an existing Chatroom</Link></label></center>
                </form>
            </div>
        </div>
    );
}

export default CreateRoom;