import './Home.css';
import { useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Home() {
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
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
        };
        fetch(`http://127.0.0.1:8000/api/message/?chatroom_code=${data.code}`, requestOptions)
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
                    <h2>Enter Chatroom</h2>
                    <label>Code</label><input {...register('code', {
                        required: "Please enter the code of the chatroom"
                    })}></input>
                    <p>{errors.code?.message}</p>
                    <center><input type='submit' value='Enter'></input></center>
                    <br/><center><label class='redirect'><Link to="../createchatroom/">Create your chatroom</Link></label></center>
                </form>
            </div>
        </div>
    );
}

export default Home;