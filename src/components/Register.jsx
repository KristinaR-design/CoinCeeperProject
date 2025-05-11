import React, { useState } from "react";
import '../css/Login.css';
import axios from 'axios';
axios.defaults.withCredentials = true
const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!userName || !password) {
            setError("Username and password are required");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/register', // Ваш Spring Boot endpoint
                {
                    login: userName, // Spring Security ожидает 'username' вместо 'name'
                    password: password
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            
            console.log(response.status)

            if (response.status == 200) {
                window.location.href = "/login"

            } else {
                setError("Registration failed..");
            }
        } catch (error) {
            setError("Registration failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>

            {error && <p className="error">{error}</p>}

            <p>
                <span>
                    Already have an account? <a className="reg__b" onClick={() => window.location.href = "/login"}>Login</a>
                </span>
            </p>
        </div>
    );
};

export default Register;
