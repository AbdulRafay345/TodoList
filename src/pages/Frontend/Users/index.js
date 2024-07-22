import React from 'react';
import { Link } from 'react-router-dom';

export default function Users() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const generateTableRows = () => {
    return users.map((user, i) => (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    ));
  };

  const table = (
    <div className="table-responsive">
      <table className="table table-striped border border-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
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
      <h1 className='text-white'>Users</h1>
      {table}

<button>
  <Link className='btn btn-outline-primary' to='/frontend/home'>Go to home</Link>
</button>
    </>
  );
}
