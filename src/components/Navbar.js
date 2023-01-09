import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

  const [name, setname] = useState("")
  
  const HOST = "http://localhost:5000";
  const navigator = useNavigate();
  let location = useLocation();

  const getdata = async () => {
    

    const response = await fetch(`${HOST}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setname(data.name)
    
  };
  getdata()

  const logout = () => {
    localStorage.clear()
    navigator("/login");
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg  bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? <><Link type="button" to="/login" className="btn btn-outline-info mx-1">Login</Link>
            <Link type="button" to="/signup" className="btn btn-outline-info mx-1">Signup</Link></> :<><h5 className="text-light">Welcome, {name}</h5> <button type="button" onClick={logout} className="btn btn-outline-info mx-1">Logout</button></>}


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
