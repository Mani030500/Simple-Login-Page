import React from 'react';
import './UserList.css';

function UserList({ users, onDeleteUser, onEditUser }) {
  return (
    <div className="user-list">
      <h3>User List</h3>
      {users.length === 0 ? (
        <p>No users added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th> {/* Added Username */}
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td> {/* Display Username */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => onEditUser(user)}>Edit</button>
                  <button onClick={() => onDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;