import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';
axios.defaults.withCredentials = true
const Login = ({ onLogin }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!userName || !password) {
            setError("Username and password are required");
            return;
        }

        try {

            const formData = new FormData();
            formData.append('username', userName);
            formData.append('password', password);


            const response = await axios.post(
                'http://localhost:8080/api/auth/login', // Ваш Spring Boot endpoint
                {
                    login: userName, // Spring Security ожидает 'username' вместо 'name'
                    password: password
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true
                }
              );

            console.log(response.data)
            if (response.status != 200) {
                setError("Login failed");
                return;
            }
            else{
                localStorage.setItem("user_id", response.data);
                localStorage.setItem("user_name", userName);
                onLogin();
                window.location.href = "/main"
            }

            
        } catch (error) {
            setError("Login failed");
        }
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit= {handleLogin}>
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
                <button type="submit">Login</button>
            </form>

            {error && <p className="error">{error}</p>}

            <p>
                <span className="register">
                    Don't have an account? <a className="reg__b" onClick={() => window.location.href = "/register"} >Register</a>
                </span>

            </p>
        </div>
    );
};

export default Login;
