import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App'; 

const Login = () => {
    const [signState, setSignState] = useState("Sign In");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [passWord, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const users = [
        { email: "nikhil@test.com", password: "Nikhil@123", userName: "Special_User" }
    ];

    const submitForm = (event) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (signState === "Sign In") {
            const user = users.find(
                u => u.email === email && u.password === passWord
            ); 


            if (user) {
                setSuccessMessage("Login Successful!");
                login(user);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setErrorMessage("Invalid email or password");
            }
        } else {
            if (userName && email && passWord) {
                const existingUser = users.find(u => u.email === email);
                
                if (existingUser) {
                    setErrorMessage("Email already registered");
                } else {
                    const newUser = { userName, email, password: passWord };
                    users.push(newUser);
                    
                    setSuccessMessage("Registration Successful! Please Sign In");
                    setTimeout(() => {
                        setSignState("Sign In");
                        setEmail(email);  
                        setPassword("");
                    }, 1500);
                }
            } else {
                setErrorMessage("Please fill all fields");
            }
        }
    };

    return (
        <div className='login'>
            <div className="loginform">
                <h1>{signState}</h1>
                <form onSubmit={submitForm}>
                    {signState === "Sign Up" && (
                        <input
                            type="text"
                            placeholder='Full Name'
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder='Email Address'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={passWord}
                        minLength="8"
                        required
                    />
                    <button type="submit">{signState}</button>
                    
                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <p>Forgot Password?</p>
                    </div>
                </form>

                {/* Error and Success Messages */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <div className="form-switch">
                    {signState === "Sign In" ? (
                        <p>New to Contact Manager? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;