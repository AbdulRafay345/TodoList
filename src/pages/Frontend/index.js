import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Todos from './Todos'
import Users from './Users'
import AddTodo from './Todos/AddTodo'

export default function Frontend() {
  return (
    <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/todos' element={<Todos />} />
        <Route path='/todos/add-todo' element={<AddTodo />} />
        <Route path='/users' element={<Users />} />
    </Routes>
  )
}
