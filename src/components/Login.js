import { useContext, useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";


const Login = () => {
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();
    const HOST = "http://localhost:5000";
    const [creds, setCreds] = useState({ email: "", password: "" })

    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {
            email: creds.email,
            password: creds.password

        }
        const response = await fetch(`${HOST}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(body)

        });
        const data = await response.json()
        console.log(data)
        if (data.success) {
            localStorage.setItem("token",data.authToken)
            navigate("/");
            showAlert("success", "Logged in Successfully")
        }
        else{
            showAlert("danger", "Invalid Login")
        }


    }

    return (
        <div className='container my-3 col-md-4'>
            <h2 className="my-3">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onchange} name="email" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" autoComplete="on" onChange={onchange} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form></div>
    )
}

export default Login