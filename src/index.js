import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./firebase_setup/Signin";
import Profile from "./firebase_setup/Profile";
import Signup from "./firebase_setup/Singup";
import Products from "./firebase_setup/Products";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="profile" element={<Profile />} />
                <Route path="products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
