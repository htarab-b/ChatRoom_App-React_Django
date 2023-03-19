import './Signup.css';
import { useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function Signup() {
    const {register, watch, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "email": data.email,
                    "username": data.username,
                    "password": data.password
                }
            )
        };
        fetch('http://127.0.0.1:8000/api/signup/', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.message) {
                    console.log(data.message);
                    navigate("../login/", { replace: true });
                }
                else {
                    setError(data.errors);
                    console.log(data.errors);
                }
            });
    }

    return (
        <div>
            <div class='body'>
            <div class='signupform'>
                <center><label>{error}</label></center>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Signup</h2>
                    <label>Email</label><input {...register('email', {
                        required: "Please provide an email",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Email invalid"
                        }
                    })}></input>
                    <p>{errors.email?.message}</p>
                    <label>Username</label><input {...register('username', {
                        required: "Username cannot be empty"
                    })}></input>
                    <p>{errors.username?.message}</p>
                    <label>Password</label><input type='password' {...register('password', {
                        required: "Please enter password"
                    })}></input>
                    <p>{errors.password?.message}</p>
                    <label>Confirm Password</label><input type='password' {...register('confirm_password', {
                        required: "Please confirm password",
                        validate: (val) => {
                            if (watch('password') !== val) {
                              return "Passwords do not match";
                            }
                        }
                    })}></input>
                    <p>{errors.confirm_password?.message}</p>
                    <center><input type='submit' value='Signup'></input></center>
                    <br/><center><label>Already a user? <Link to="../login/">Login</Link></label></center>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Signup;