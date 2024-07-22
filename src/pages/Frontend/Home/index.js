import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  const [numberUsers, setNumberUsers] = useState(0);
  const [numberTodos, setNumberTodos] = useState(0);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    setNumberUsers(users.length)
  }, [])
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    setNumberTodos(todos.length)
  }, [])


  return (
    <>
      <h1 className='text-white'>Welcome to Task Vault!</h1>
      <div className="container card mb-2">
        <div className="row">
          <div className="col text-center">
            <h3 className='pt-5'>Users</h3>
            <div className='fw-bold mb-3'>Number of Users: {numberUsers}</div>
            <button className='btn btn-primary'><Link to='/frontend/users' className='text-white' style={{textDecoration:"none"}}>Check Users</Link></button>
          </div>
        </div>
      </div>
      <div className="container card">
        <div className="row">
          <div className="col text-center">
            <h3 className='pt-5'>Todo List</h3>
            <div className='fw-bold mb-3'>Number of Todos: {numberTodos}</div>
            <button className='btn btn-primary'><Link to='/frontend/todos' className='text-white' style={{textDecoration:"none"}}>Check Todos</Link></button>
          </div>
        </div>
      </div>
    </>
  )

}
