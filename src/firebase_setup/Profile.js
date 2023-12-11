import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { auth, changeEmail, changePassword } from './firebase';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
    var userEmail = document.getElementById('userEmail');
    var messageElement = document.getElementById('signOutMessage');

    try {
      await auth.signOut();
      userEmail.textContent = "Not logged in";

      messageElement.textContent = 'User signed out successfully';
      messageElement.style.color = 'green';

    } catch (error) {
      messageElement.textContent = 'Error signing out: ' + error.message;
      messageElement.style.color = 'red';
    }
  };

  return (
    <>
      <Navigation />
      <body id='profilePage'>
        <h1>Your Profile</h1>
        <main>
          <p id='userEmail'>Current Email: {currentEmail}</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input type="email" id="newEmail" placeholder="Enter new email" required />
          <input type="password" id="currentPassword" placeholder="Enter your password" required />
          <button onClick={() => changeEmail(newEmail, password, setCurrentEmail)}>Update Email</button>
          <p id="emailChangeMessage"></p>

          <input type="password" id="password" placeholder="Enter current password" required />
          <input type="password" id="newPassword" placeholder="Enter new password" required />
          <button onClick={() => changePassword(password, newPassword)}>Update Password</button>
          <p id="passwordChangeMessage"></p>

          <button id='signOutButton' onClick={() => handleLogout(setCurrentEmail)}>Sign Out</button>
          <p id="signOutMessage"></p>
        </main>
      </body>
    </>
  );
};

export default Profile;