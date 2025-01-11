import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = React.useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:8080/users/verify', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`), // Encode credentials in Base64
          },
        });
  
        if (response.status == 200) {
          const authToken= btoa(`${username}:${password}`);
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('username', username);
          // Successful login
          setError('Login Was Successfull');
          navigate('/dashboard'); // Redirect to a dashboard or home page
        } else {
            setError("Failed to login. Please try again.");;
      setTimeout(() => {
        setError("");
      },3000);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to login. Please try again.");
      setTimeout(() => {
        setError("");
      },3000);
      }
    };
  

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Get to Your Notes!</p>
        <p className="message">Sign In to get started !</p>
        {error && <p className="error" style={{ color: "red" }}>{error}</p>}
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span classNameName="placeholder">Username</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span classNameName="placeholder">Password</span>
        </label>
        <button className="submit" type="submit">Submit</button>
        <p className="signin">
          New to LamBook? <Link to="/register"> Create an Account</Link>{" "}
        </p>
      </form>
    </>
  );
}

export default Login;
