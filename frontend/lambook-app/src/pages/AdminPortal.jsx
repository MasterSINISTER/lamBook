import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import { Button } from "@mui/material";

function AdminPortal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/admin/verify", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`), // Encode credentials in Base64
        },
      });

      if (response.status == 200) {
        const authToken = btoa(`${username}:${password}`);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("username", username);
        // Successful login
        setError("Login Was Successfull");
        navigate("/admindash"); // Redirect to a dashboard or home page
      } else {
        setError("You are not an Admin. Please try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setError("Something Went Wrong! 😒");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <Heading title="Admin Portal"></Heading>

      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Log In Master</p>
        <p className="message">Get Access to Your Admin Dashboard</p>
        {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span classNameName="placeholder">Admin Username</span>
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
          <span classNameName="placeholder">Admin Password</span>
        </label>
        <button className="submit" type="submit">
          Submit
        </button>

        <Button>
          <Link to="/" style={{ textDecoration: "none" }}>User Login</Link>
        </Button>
      </form>
    </>
  );
}

export default AdminPortal;
