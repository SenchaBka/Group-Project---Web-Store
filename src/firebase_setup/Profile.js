import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { auth, changeEmail, changePassword, addNewItem, showUserItems, updateItem } from './firebase';

const Profile = () => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');

  const [newItem, setNewItem] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDesc, setItemDesc] = useState('');

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
      <body>
        <Navigation />
        <h1>Profile</h1>
        <p>Current Email: {currentEmail}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p id="userEmail"></p>
        <input type="email" id="newEmail" placeholder="Enter new email" required />
        <input type="password" id="currentPassword" placeholder="Enter your password" required />
        <button onClick={() => changeEmail(newEmail, password, setCurrentEmail)}>Update Email</button>
        <p id="emailChangeMessage"></p>

        <input type="password" id="password" placeholder="Enter current password" required />
        <input type="password" id="newPassword" placeholder="Enter new password" required />
        <button onClick={() => changePassword(password, newPassword)}>Update Password</button>
        <p id="passwordChangeMessage"></p>

        <section id='addItemForm'>
          <h2>Add Item</h2>
          <label htmlFor="itemName">Item Name:</label><br />
          <input type="text" id="itemName" name="itemName" required /><br />
          <label htmlFor="itemPrice">Item Description:</label><br />
          <input type="text" id="itemDesc" name="itemDesc" required /><br />
          <label htmlFor="itemPrice">Item Price:</label><br />
          <input type="text" id="itemPrice" name="itemPrice" required /><br />
          <button onClick={() => addNewItem()}>Add Item</button>
          <p id="itemAddMessage"></p>
        </section>

        <section id='editItemForm' style={{ display: 'none' }}>
        <h2>Edit Item</h2>
          <label htmlFor="editItemName">New Item Name:</label><br />
          <input type="text" id="editItemName" name="editItemName" required /><br />
          <label htmlFor="editItemDesc">New Item Description:</label><br />
          <input type="text" id="editItemDesc" name="editItemDesc" required /><br />
          <label htmlFor="editItemPrice">New Item Price:</label><br />
          <input type="text" id="editItemPrice" name="editItemPrice" required /><br />
        </section>

        <h2>Your Products:</h2>
        <ul id="items-list"></ul>
        <button onClick={() => showUserItems(password, newPassword)}>Show your products</button>
      </body>
    </>
  );
};

export default Profile;