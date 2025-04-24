import React, { useState, useEffect } from 'react';
import './UserForm.css';

function UserForm({ onAddUser, editingUser, onUpdateUser, onCancelEdit }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username);
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setUsername('');
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingUser) {
      onUpdateUser({ id: editingUser.id, username: editingUser.username, name, email }); // Keep username for update
    } else {
      // For simplicity, we won't include password in the add form here.
      // In a real scenario, you'd handle password creation securely on the backend.
      onAddUser({ username, name, email });
    }
    setUsername('');
    setName('');
    setEmail('');
  };

  return (
    <div className="user-form">
      <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            readOnly={editingUser ? true : false} 
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
        {editingUser && (
          <button type="button" onClick={onCancelEdit}>Cancel Edit</button>
        )}
      </form>
    </div>
  );
}

export default UserForm;