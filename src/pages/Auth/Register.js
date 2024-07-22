import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export default function Register() {
  const [state, setState] = useState({ name: "", email: "", password: "" })
  let handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  let navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    let { name, email, password } = state
    if (!name || !email || !password) return toast.error("Please enter all inputs correctly!", { position: "bottom-left" })

    const formData = { name, email, password }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userExists = users.find(user => user.email === email);

    if (userExists) {
      toast.error("User Already Exists", { position: "bottom-left" })
    } else {
      users.push(formData)
      localStorage.setItem('users', JSON.stringify(users));
      navigate("/frontend/home")
    }
  }

  return (
    <>
      <form id='registerForm' onSubmit={handleSubmit} className='p-5 border border-dark rounded-2'>
        <div className='container'>
          <div className='mb-3'>
            <h2>Register</h2>
            <h5 className='small'>To get started</h5>
          </div>
          <div className="mb-3">
            <label htmlFor="registerName" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' id="registerName" aria-describedby="emailHelp" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="registerEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id="registerEmail" aria-describedby="emailHelp" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="registerPassword" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
          <div className='mt-3'>
            <p className='small text-center'>Already have an account?<Link to='/' style={{ textDecoration: "none", color: "black" }}> Login</Link></p>
          </div>
        </ div>
      </form>
      <ToastContainer />
    </>
  )
}
