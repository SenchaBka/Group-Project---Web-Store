import { initializeApp } from 'firebase/app';
import { getFirestore, doc, addDoc, setDoc, collection, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignout,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyAve3Kdp7vBhqt0E6BA0fWpbOSCxIqOCls",
    authDomain: "week11-1-6c138.firebaseapp.com",
    projectId: "week11-1-6c138",
    storageBucket: "week11-1-6c138.appspot.com",
    messagingSenderId: "753661187204",
    appId: "1:753661187204:web:94e664f28ed4119a0e9ed1",
    measurementId: "G-LK84KM2HT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        await addDoc(collection(db, "users"), { uid: user.uid, email: user.email });

        var messageElement = document.getElementById('message');
        messageElement.textContent = 'Login successful!';
        messageElement.style.display = 'block';

        return true;
    } catch (error) {
        // Handle login errors
        var messageElement = document.getElementById('message');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.display = 'block';
    }
};


const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        var messageElement = document.getElementById('message');
        messageElement.textContent = 'Login successful!';
        messageElement.style.display = 'block';

        return true;
    } catch (error) {
        // Handle login errors
        var messageElement = document.getElementById('message');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.display = 'block';
    }
};


const signOut = async () => {
    try {
        await firebaseSignout(auth);
        return true;
    } catch (error) {
        return false;
    }
};


async function changeEmail(newEmail, password, setCurrentEmail) {
    var user = auth.currentUser;
    var newEmail = document.getElementById('newEmail').value;
    var password = document.getElementById('currentPassword').value;
    var messageElement = document.getElementById('emailChangeMessage');

    if (user) {
        try {
            // Reauthenticate the user with their current password
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            // Update the email in the user profile
            await updateEmail(user, newEmail);
            setCurrentEmail(newEmail);

            messageElement.textContent = 'Email updated successfully!';
            messageElement.style.color = 'green';

        } catch (error) {
            messageElement.textContent = 'Error updating email: ' + error.message;
            messageElement.style.color = 'red';
        }
    } else {
        messageElement.textContent = "You have to log in";
        messageElement.style.color = 'red';
    }
}

async function changePassword(currentPassword, newPassword) {
    var user = auth.currentUser;
    var newPassword = document.getElementById('newPassword').value;
    var currentPassword = document.getElementById('password').value;
    var messageElement = document.getElementById('passwordChangeMessage');

    if (user) {
        try {
            // Reauthenticate the user with their current password
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update the email in the user profile
            await updatePassword(user, newPassword);

            messageElement.textContent = 'Password updated successfully!';
            messageElement.style.color = 'green';

        } catch (error) {
            messageElement.textContent = 'Error updating password: ' + error.message;
            messageElement.style.color = 'red';
        }
    } else {
        messageElement.textContent = "You need to log in";
        messageElement.style.color = 'red';
    }
}

async function addNewItem(itemName, itemDesc, itemPrice) {
    var messageElement = document.getElementById('itemAddMessage');
    var itemName = document.getElementById('itemName').value;
    var itemDesc = document.getElementById('itemDesc').value;
    var itemPrice = document.getElementById('itemPrice').value;

    var user = auth.currentUser;
    if (user) {
        try {
            await setDoc(doc(db, "items", itemName), {
                name: itemName,
                price: itemPrice,
                description: itemDesc,
                userId: user.uid
            })

            messageElement.textContent = 'Item added successfully!';
            messageElement.style.color = 'green';

            showUserItems();
        } catch (error) {
            messageElement.textContent = 'Error adding item: ' + error.message;
            messageElement.style.color = 'red';
        }

    } else {
        messageElement.textContent = 'You have to log in';
        messageElement.style.color = 'red';
    }
}

async function showAllItems() {
    var itemsList = document.getElementById('items-list');
    itemsList.innerHTML = ""; // Clear existing items in the list
    var user = auth.currentUser;

    if (user) {
        const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach((doc) => {
            const listItem = document.createElement('li');
            listItem.textContent = doc.data().name + " - " + doc.data().description + ' - ' + doc.data().price + "$";

            itemsList.appendChild(listItem);
        });
    }
    else{
        const listItem = document.createElement('li');
        listItem.textContent = "You have to Sign in/Sign up to see the products";
        itemsList.appendChild(listItem);
    }
}


async function showUserItems() {
    var itemsList = document.getElementById('items-list');
    itemsList.innerHTML = ""; // Clear existing items in the list
    var user = auth.currentUser;

    if (user) {
        const querySnapshot = await getDocs(query(collection(db, "items"), where("userId", "==", user.uid)));
        querySnapshot.forEach((doc) => {

            const listItem = document.createElement('li');
            listItem.textContent = doc.data().name + " - " + doc.data().description + ' - ' + doc.data().price + "$";
            itemsList.appendChild(listItem);

            // Add an edit button for each item
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => showEditForm(doc.id));

            // Add a delete button for each item
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteItem(doc.id));

            //listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);
        });
    }
}

async function deleteItem(itemId) {
    var itemsList = document.getElementById('items-list');
    try {
        await deleteDoc(doc(db, "items", itemId));
        showUserItems();
        itemsList.append("Item deleted successfully");
    } catch (error) {
        itemsList.append("Error deleting item:", error.message);
    }
}

async function showEditForm(itemId){
    var editForm = document.getElementById('editItemForm');
    editForm.style.display = 'block';
    document.getElementById("addItemForm").style.display = "none";

    var updateButton = document.createElement('button');
    updateButton.textContent = "Edit item"
    updateButton.addEventListener('click', function() {
        updateItem(itemId);
    });
    editForm.appendChild(updateButton);
}

async function updateItem(itemId) {
    var editForm = document.getElementById('editItemForm');
    var itemsList = document.getElementById('items-list');

    // Correctly access form elements by their IDs
    var itemName = document.getElementById('editItemName').value;
    var itemDesc = document.getElementById('editItemDesc').value;
    var itemPrice = document.getElementById('editItemPrice').value;

    try {
        await updateDoc(doc(db, "items", itemId), {
            name: itemName,
            description: itemDesc,
            price: itemPrice,
        });

        editForm.style.display = 'none';
        document.getElementById("addItemForm").style.display = "block";
        showUserItems();

        var messageElement = document.createElement('p');
        messageElement.textContent = "Item updated successfully";
        itemsList.appendChild(messageElement);

    } catch (error) {
        var messageElement = document.createElement('p');
        messageElement.textContent = "Error updating item: " + error.message;
        itemsList.appendChild(messageElement);
    }
}

export { app, auth, signUp, signIn, signOut, changeEmail, changePassword, addNewItem, showUserItems, showAllItems, updateItem };
