import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';



const Signup = () => {
  const {showAlert}=useContext(AlertContext)
  const navigate = useNavigate()
  const HOST = "http://localhost:5000";
  const [creds, setCreds] = useState({ name: "", email: "", password: "", cpasswrod: "" })

  const onchange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      name: creds.name,
      email: creds.email,
      password: creds.password

    }
    const response = await fetch(`${HOST}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(body)

    });
    const data = await response.json()
    console.log(data)
    if (data.success) {
      localStorage.setItem("token", data.authtoken)
      navigate("/");
      showAlert("success", "Welcome to iNoteBook")
    }
    else {
      showAlert("danger", "Signup Failed")
    }


  }

  return (
    <div className='container col-md-4'>
      <h2 className="my-3">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" name="name" onChange={onchange} id="name" aria-describedby="Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" onChange={onchange} id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" autoComplete="on" name="password" onChange={onchange} id="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" autoComplete="on" name="cpassword" onChange={onchange} id="cpassword"minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup