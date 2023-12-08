import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignout,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth';
import { useState } from 'react';

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
    var userEmail = document.getElementById('userEmail');

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
        messageElement.textContent = "You need to log in";
        messageElement.style.color = 'red';
    }
}

export { app, auth, signUp, signIn, signOut, changeEmail };
