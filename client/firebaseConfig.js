// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcKf6SFzccs2doWObh8HZ-MO4_O8l8fws",
    authDomain: "web-dev-c20fd.firebaseapp.com",
    projectId: "web-dev-c20fd",
    storageBucket: "web-dev-c20fd.appspot.com",
    messagingSenderId: "737856138554",
    appId: "1:737856138554:web:6b2a83f2448d60f51df403",
    measurementId: "G-54Z13RLFGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
});