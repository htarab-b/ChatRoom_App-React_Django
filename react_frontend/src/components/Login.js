import './Login.css';
import { useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "username": data.username,
                    "password": data.password
                }
            )
        };
        fetch('http://127.0.0.1:8000/api/login/', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.message) {
                    console.log(data.message, ': ', data.token);
                    localStorage.setItem('token', data.token);
                    navigate("../", { replace: true });
                }
                else {
                    setError(data.error);
                    console.log(data.error);
                }
            });
    }

    return (
        <div class='body'>
            <div class='loginform'>
                <center><label>{error}</label></center>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Login</h2>
                    <label>Username</label><input {...register('username', {
                        required: "Username cannot be empty"
                    })}></input>
                    <p>{errors.username?.message}</p>
                    <label>Password</label><input type='password' {...register('password', {
                        required: "Please enter password"
                    })}></input>
                    <p>{errors.password?.message}</p>
                    <center><input type='submit' value='Login'></input></center>
                    <br/><center><label class='redirect'>Don't have an account? <Link to="../signup/">Signup</Link></label></center>
                </form>
            </div>
        </div>
    );
}

export default Login;