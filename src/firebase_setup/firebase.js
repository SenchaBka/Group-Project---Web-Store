import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignout,
} from "firebase/auth";
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
        return true;
    } catch (error) {
        return { error: error.message };
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
export { app, signUp, signIn, signOut };
