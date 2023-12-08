import { useState } from "react";
import { signIn } from "./firebase";
import Navigation from "../components/Navigation"
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        const res = await signIn(email, password);
    };
    return (
        <>
            {error ? <div>{error}</div> : null}
            <Navigation />
            <p id="message" style={{ display: 'none' }}></p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="submit" />
            </form>
            <p>
                Not registered? <Link to="/signup">Sign up</Link>
            </p>
        </>
    );
};
export default Login;
