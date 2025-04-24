import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

// In-memory user data for demonstration ONLY.
// DO NOT store real passwords like this in a production app.
const initialUsers = [
  { id: 1, username: 'testuser', password: 'password123', name: 'Test User', email: 'test@example.com' },
  { id: 2, username: 'admin', password: 'secureadmin', name: 'Admin User', email: 'admin@example.com' },
  { id: 2, username: 'Mani', password: 'Mani@123', name: 'Admin User', email: 'mani@example.com' },
  { id: 2, username: 'Prakash', password: 'Prakash@123', name: 'Admin User', email: 'prakash@example.com' },
  { id: 2, username: 'vks', password: 'Vks@123', name: 'Admin User', email: 'vks@example.com' },
  { id: 2, username: 'sara', password: 'Sara@123', name: 'Admin User', email: 'sara@example.com' },
  { id: 2, username: 'mohan', password: 'Mohan@123', name: 'Admin User', email: 'mohan@example.com' },
  { id: 2, username: 'asgbaby', password: 'Agsbaby@123', name: 'Admin User', email: 'asgbabysmiles@example.com' },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
  const [editingUser, setEditingUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // To store logged-in user

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleLogin = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setLoggedIn(true);
      setCurrentUser(user);
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
  };

  const addUser = (newUser) => {
    newUser.id = Date.now(); // Simple unique ID
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setEditingUser(null); // Clear editing state if the deleted user was being edited
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? { ...user, name: updatedUser.name, email: updatedUser.email } : user
      )
    );
    setEditingUser(null);
  };

  const startEdit = (user) => {
    setEditingUser({ ...user }); // Create a copy to avoid direct state mutation
  };

  return (
    <div className="app">
      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div>
          <h2>User Management</h2>
          {currentUser && <p>Logged in as: {currentUser.username}</p>}
          <button onClick={handleLogout}>Logout</button>
          <UserForm onAddUser={addUser} editingUser={editingUser} onUpdateUser={updateUser} onCancelEdit={() => setEditingUser(null)} />
          <UserList users={users} onDeleteUser={deleteUser} onEditUser={startEdit} />
        </div>
      )}
    </div>
  );
}

export default App;