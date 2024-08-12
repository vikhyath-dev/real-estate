import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './register.scss'
import axios from 'axios'
import apiRequest from '../../lib/apiRequest';

export default function Register() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      setError("");
      setIsLoading(true);
        const formData = new FormData(e.target);

        const username = formData.get("username")
        const email = formData.get("email");
        const password = formData.get("password");
    
        try {
            const res = await apiRequest.post("/auth/register", {
                username, email, password
            })
          
          navigate("/login")
        } catch (err) {
          console.log(err)
          setError(err.response.data.message)
        } finally {
          setIsLoading(false)
        }

        console.log(username, email, password)
    }
  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
          {error && <span>{error}</span>}
         <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}
