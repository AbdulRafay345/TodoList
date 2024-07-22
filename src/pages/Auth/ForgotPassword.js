import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function ForgotPassword() {
  let [state, setState] = useState({ email: "", newPassword: "", confirmPassword: "" });
  let navigate = useNavigate()
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();

    const { email, newPassword, confirmPassword } = state
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (!email || !newPassword) return toast.error("Please fill all inputs correctly!", { position: "bottom-left" })

    let userExists = users.find(user => user.email === email);
    let passwordFound = users.find(user => user.password === newPassword)
    if(passwordFound) return toast.error("Your new Password is same as old one",{position:"bottom-left"})
    if (!userExists) return toast.error("User not found", { position: "bottom-left" })
    if (newPassword !== confirmPassword) return toast.error("Passwords not match", { position: "bottom-left" })

    users = users.map(user => user.email === email ? { ...user, password: newPassword } : user)
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Password updated succesfully", { position: "bottom-left" })
    navigate("/")
  }
  return (
<>
      <form id='forgotPasswordForm' className='p-5 border border-dark rounded-2' onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row mb-3'>
            <h2>Forgot Password</h2>
            <h5 className='small'>Enter Email & password</h5>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="forgotPasswordEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' id="forgotPasswordEmail" aria-describedby="emailHelp" onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="new Password" className="form-label">New Password</label>
              <input type="password" className="form-control" name='newPassword' id="newPassword" onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" name='confirmPassword' id="confirmPassword" onChange={handleChange} />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <button type="submit" className="btn btn-primary w-100">Submit</button>
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
