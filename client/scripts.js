
var firebaseConfig = {
    apiKey: "AIzaSyAve3Kdp7vBhqt0E6BA0fWpbOSCxIqOCls",
    authDomain: "week11-1-6c138.firebaseapp.com",
    projectId: "week11-1-6c138",
    storageBucket: "week11-1-6c138.appspot.com",
    messagingSenderId: "753661187204",
    appId: "1:753661187204:web:94e664f28ed4119a0e9ed1",
    measurementId: "G-LK84KM2HT8"
};
// Existing Firebase initialization
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Initialize Firebase Authentication
var auth = firebase.auth();

document.getElementById('addItemForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var itemsList = document.getElementById('items-list');

    var user = auth.currentUser;
    if (user) {
        itemsList.innerHTML = "Item added successfully";
        // User is signed in, allow them to add items
        var itemName = document.getElementById('itemName').value;
        var itemDesc = document.getElementById('itemDesc').value;
        var itemPrice = document.getElementById('itemPrice').value;

        db.collection("items").add({
            name: itemName,
            price: itemPrice,
            description: itemDesc,
            userId: user.uid
        })
    } else {
        itemsList.innerHTML = "Error. You have to log in";
    }
});

function showUserItems() {
    var itemsList = document.getElementById('items-list');
    itemsList.innerHTML = ""; // Clear existing items in the list
    var user = auth.currentUser;
    if (user) {
        // Listen for real-time updates on the items collection for the current user
        db.collection("items").where("userId", "==", user.uid).onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const itemData = doc.data();
                const listItem = document.createElement('li');
                listItem.textContent = doc.data().name + " - " + doc.data().description + ' - ' + doc.data().price + "$";

                itemsList.appendChild(listItem);

                // Add an edit button for each item
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => showEditForm(doc.id, itemData));

                // Add a delete button for each item
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteItem(doc.id));

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);
            });
        }, (error) => {
            console.error("Error getting items:", error.message);
        });
    }

    function deleteItem(itemId) {
        db.collection("items").doc(itemId).delete()
            .then(() => {
                showUserItems();
                itemsList.append("Item deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting item: ", error);
            });
    }
}

// Function to show the edit form for an item
function showEditForm(itemId, itemData) {
    // Assuming you have a form with id="editItemForm" in your HTML
    var editForm = document.getElementById('editItemForm');
    editForm.style.display = 'block';
    document.getElementById("addItemForm").style.display = "none";

    // Populate the form with existing item data
    editForm.elements['editItemId'].value = itemId;
    editForm.elements['editItemName'].value = itemData.name;
    editForm.elements['editItemDesc'].value = itemData.description;
    editForm.elements['editItemPrice'].value = itemData.price;
}

function updateItem() {
    var editForm = document.getElementById('editItemForm');
    var itemId = editForm.elements['editItemId'].value;
    var itemName = editForm.elements['editItemName'].value;
    var itemDesc = editForm.elements['editItemDesc'].value;
    var itemPrice = editForm.elements['editItemPrice'].value;

    db.collection("items").doc(itemId).update({
        name: itemName,
        description: itemDesc,
        price: itemPrice,
    })
        .then(() => {
            console.log("Item updated successfully");
            // After updating the item, hide the edit form and refresh the displayed items
            editForm.style.display = 'none';
            document.getElementById("addItemForm").style.display = "block";
            showUserItems();
        })
        .catch((error) => {
            console.error("Error updating item: ", error);
        });
}

// Handle form submission for changing user information
document.getElementById('changeProfileForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var newEmail = document.getElementById('userEmail').value;
    var newPassword = document.getElementById('userPassword').value;
    var newName = document.getElementById('userName').value;

    // Get the current user
    var user = firebase.auth().currentUser;

    // Update user information
    var promises = [];

    if (newEmail !== user.email) {
        promises.push(user.updateEmail(newEmail));
    }

    if (newPassword !== "") {
        promises.push(user.updatePassword(newPassword));
    }

    promises.push(user.updateProfile({ displayName: newName }));

    // Wait for all promises to complete
    Promise.all(promises).then(function () {
        // Update successful
        var messageElement = document.getElementById('changeMessage');
        messageElement.textContent = 'User information changed successfully!';
        messageElement.style.display = 'block';

        // After 3 seconds, redirect to index.html
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 1000);
    }).catch(function (error) {
        // An error occurred
        var messageElement = document.getElementById('changeMessage');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.display = 'block';
    });
});
