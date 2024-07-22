import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Frontend from './pages/Frontend'

export default function Index() {
  return (
    <Routes>
        <Route path='/*' element={<Auth />} />
        <Route path='frontend/*' element={<Frontend />} />
    </Routes>
  )
}
