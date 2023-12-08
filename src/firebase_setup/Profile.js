import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { auth, changeEmail } from './firebase';

const Profile = () => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');

  useEffect(() => {
    // Fetch the current user's email when the component mounts
    const user = auth.currentUser;
    if (user) {
      setCurrentEmail(user.email); // Access the 'email' property
    }
  }, []);

  const handleLogout = async () => {
    // Your existing logout logic
  };

  return (
    <>
      <Navigation />
      <h1>Profile</h1>
      <p>Current Email: {currentEmail}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p id="userEmail"></p>
      <input type="email" id="newEmail" placeholder="Enter new email" required />
      <input type="password" id="currentPassword" placeholder="Enter your password" required />
      <button onClick={() => changeEmail(newEmail, password, setCurrentEmail)}>Update Email</button>
      <p id="emailChangeMessage"></p>
    </>
  );
};

export default Profile;