import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "./firebase";
import Navigation from "../components/Navigation"
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError("Passwords do not match");
        } else {
            setEmail("");
            setPassword("");
            setPassword2("");
            const res = await signUp(email, password);
            if (res) {
                navigate("/");
            }
        }
    };
    return (
        <>
            <Navigation />
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Your Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Your Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <p id="message" style={{ display: 'none' }}>
                    </p>
                    {error ? <div style={{color: 'red'}}>{error}</div> : null}
                    <input type="submit" value="Submit" />
                    <p>
                        Already registered? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
};
export default Signup;
