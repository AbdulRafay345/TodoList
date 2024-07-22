import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function AddTodo() {


    let [state, setState] = useState({ title: "", description: "", status: "Incomplete", dateCreated: "", location: "" })
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault();

        let { title, description, status,dateCreated, location } = state
        const id = '_' + Math.random().toString(36).slice(2);

        const formData = { title, description, status, id, dateCreated, location }

        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        let todoExists = todos.find(todo => todo.title === title);

        if (todoExists) {
            toast.error("Task Already Exists", { position: "bottom-left" })
        } else {
            todos.push(formData)
            localStorage.setItem('todos', JSON.stringify(todos));
            toast.success("Task added successfully", {position:"bottom-left"})
        }
    }

    return (
        <>
            <form id='addTodoForm' className='p-5 border border-dark rounded-2' onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='mb-3'>
                        <h2>Add todo</h2>
                        <h5 className='small'>Manage your work with Task Vault</h5>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" name='title' placeholder='Title' id="todoTitle" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <textarea name="description" id="todoDescription" placeholder='Description' className='border rounded-2 ps-2 pt-1' onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <input type="date" className="form-control" name='dateCreated' placeholder='Date' id="dateCreated" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" name='location' placeholder='Location' id="location" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add</button>
                    <div className='mt-2'>
                        <p className='text-center'><Link to='/frontend/todos' style={{fontWeight:"bold"}}>Check Todos</Link></p>
                    </div>
                </ div>
            </form>
            <ToastContainer />
        </>
    )
}
