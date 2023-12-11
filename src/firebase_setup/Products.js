import Navigation from '../components/Navigation';
import { addNewItem, showUserItems, showCart } from './firebase';

const Products = () => {

  return (
    <>
      <Navigation />
      <body id='productsPage'>

        <h1>Your Products Management Page</h1>

        <section id='addItemForm'>
          <h2>Add Item</h2>
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" name="itemName" required />
          <label htmlFor="itemPrice">Item Description:</label>
          <input type="text" id="itemDesc" name="itemDesc" required />
          <label htmlFor="itemPrice">Item Price:</label>
          <input type="text" id="itemPrice" name="itemPrice" required />
          <button onClick={() => addNewItem()}>Add Item</button>
          <p id="itemAddMessage"></p>
        </section>

        <section id='editItemForm' style={{ display: 'none' }}>
          <h2>Edit Item</h2>
          <label htmlFor="editItemName">New Item Name:</label>
          <input type="text" id="editItemName" name="editItemName" required />
          <label htmlFor="editItemDesc">New Item Description:</label>
          <input type="text" id="editItemDesc" name="editItemDesc" required />
          <label htmlFor="editItemPrice">New Item Price:</label>
          <input type="text" id="editItemPrice" name="editItemPrice" required />
        </section>

        <h2>Your Products:</h2>
        <button id='viewProducts' onClick={() => showUserItems()}>View your products</button>
        <ul id="items-list"></ul>

        <h2>Your Cart:</h2>
        <button id='viewCart' onClick={() => showCart()}>View your cart</button>
        <ul id="cart-list"></ul>
        <p id='addToCartMessage'></p>
      </body>
    </>
  );
};

export default Products;