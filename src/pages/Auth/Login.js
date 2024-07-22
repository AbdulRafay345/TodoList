import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [state, setState] = useState({ email: "", password: "" })
  let handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  let navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    let { email, password } = state
    if (!email && !password) return toast.error("Please enter all inputs correctly!", { position: "bottom-left" })

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.find(user => user.email === email && user.password === password)
    if (userExists) {
      navigate("/frontend/home")
    } else {
      toast.error("Email or Password is incorrect!", { position: "bottom-left" })
    }

  }


  return (

    <>
      <form id='loginForm' className='p-5 border border-dark rounded-2' onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row mb-3'>
            <h2>Login</h2>
            <h5 className='small'>Welcome Back!</h5>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="loginEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' id="loginEmail" aria-describedby="emailHelp" onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3 d-flex flex-column" id='forgotPasswordCol'>
              <Link to='/forgot-password' id='forgotPasswordBtn' className='small' style={{ textDecoration: "none", color: "black" }}>Forgot Password</Link>
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' id="loginPassword" onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="submit" className="btn btn-primary w-100">Login</button>
              <div className='mt-3'>
                <p className='small text-center'>Don't have an account?<Link to='/register' style={{ textDecoration: "none", color: "black" }}> Register Now</Link></p>
              </div>
            </ div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}