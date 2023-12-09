import Navigation from '../components/Navigation';
import { addNewItem, showUserItems } from './firebase';

const Profile = () => {

  return (
    <>
      <body>
        <Navigation />
        <h1>Your Products</h1>

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
        <button onClick={() => showUserItems()}>Show your products</button>
      </body>
    </>
  );
};

export default Profile;