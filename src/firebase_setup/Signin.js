import { useState } from "react";
import { signIn } from "./firebase";
import Navigation from "../components/Navigation"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        const res = await signIn(email, password);

        if (res) {
            navigate("/");
        }
    };

    return (
        <>
            <body id='signIn'>
                <Navigation />
                <form onSubmit={handleSubmit}>
                    <h2>Sign in</h2>
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
                    <p id="message" style={{ display: 'none' }}></p>
                    {error ? <div style={{color: 'red'}}>{error}</div> : null}
                    <input type="submit" value="Submit" />
                    <p>
                        Not registered? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </body>
        </>
    );
};
export default Login;
