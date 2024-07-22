import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Modal, Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';

const { Paragraph } = Typography;

export default function TodoTable() {
  const [state, setState] = useState({  updateTitle: "", updateDescription: "", updateStatus: "", updateLocation: "", id: "" });

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let navigate = useNavigate();

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const { updateTitle, updateDescription, updateStatus, updateLocation, id } = state;

    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: updateTitle,
          description: updateDescription,
          status: updateStatus,
          location: updateLocation
        };
      }
      return todo;
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    toast.success("Todo updated successfully", { position: "bottom-left" });

    setState({ 
      updateTitle: "", 
      updateDescription: "", 
      updateStatus: "", 
      updateLocation: "", 
      id: "" 
    });
  };

  const handleUpdateClick = (todoId) => {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    if (selectedTodo) {
      setState({
        updateTitle: selectedTodo.title,
        updateDescription: selectedTodo.description,
        updateStatus: selectedTodo.status,
        updateLocation: selectedTodo.location,
        id: selectedTodo.id
      });
    }
  };

  const handleDeleteClick = (todoId) => {
    const todoToDelete = todos.find(todo => todo.id === todoId);
    if (todoToDelete) {
      setTodoToDelete(todoToDelete);
      setDeleteModalVisible(true);
    }
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      let updatedTodos = todos.filter(todo => todo.id !== todoToDelete.id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      toast.success("Todo deleted successfully", { position: "bottom-left" });
      todos = updatedTodos;
      navigate("/frontend/todos");
    }
    setDeleteModalVisible(false);
  };

  const generateTableRows = () => {
    return todos.map((todo, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{todo.title}</td>
        <td><Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "read more" }}>{todo.description}</Paragraph></td>
        <td>{todo.status}</td>
        <td>{todo.dateCreated}</td>
        <td>{todo.id}</td>
        <td>{todo.location}</td>
        <td>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateTodoModal" onClick={() => handleUpdateClick(todo.id)}>
            Update
          </button>
          <button type='button' className='btn btn-outline-primary mt-2' onClick={() => handleDeleteClick(todo.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const table = (
    <div className="table-responsive">
      <table className="table table-striped-columns border border-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Date Created</th>
            <th scope="col">Id</th>
            <th scope="col">Location</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {generateTableRows()}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <h1 className='text-white'>Todos</h1>
      <button className='mb-2'>
        <Link className='btn btn-outline-primary' to='/frontend/todos/add-todo'>Add todo</Link>
      </button>
      {todos.length > 0 ? table : <p className='text-white fs-4'>No todos available</p>}
      <button className='mb-2'>
        <Link className='btn btn-outline-primary' to='/frontend/home'>Go to home</Link>
      </button>

      {/* Update Todo Modal */}
      <div className="modal fade" id="updateTodoModal" tabIndex="-1" aria-labelledby="updateTodoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateTodoModalLabel">Update Todo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id='updateTodoForm' className='p-5 border border-dark rounded-2' onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className='container'>
                  <div className='mb-3'>
                    <h2>Update todo</h2>
                    <h5 className='small'>Manage your work with Task Vault</h5>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" name='updateTitle' placeholder='Title' id="updateTitle" value={state.updateTitle} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <textarea name="updateDescription" id="updateDescription" placeholder='Description' className='border rounded-2 ps-2 pt-1' value={state.updateDescription} onChange={handleChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" name='updateStatus' placeholder='Status' id="updateStatus" value={state.updateStatus} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" name='updateLocation' placeholder='Location' id="updateLocation" value={state.updateLocation} onChange={handleChange} />
                  </div>
                  <input type="hidden" name="id" value={state.id} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal
        visible={deleteModalVisible}
        title="Confirm Delete"
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" onClick={confirmDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this todo?</p>
      </Modal>

      <ToastContainer />
    </>
  );
}
