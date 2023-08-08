import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/teacher';
import '../component/dashboard';

import './login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate  = useNavigate();

const handleUsernameChange = (e) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
        
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard');  
         
      } catch (error) {
        console.error("Login failed:", error);
        setError(error.error || "An error occurred during login.");
      }

      setLoading(false);
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}

export default Login
