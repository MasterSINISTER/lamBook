import React from "react";
import "../styles/Register.css";
import Heading from "../components/Heading";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
function Register() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/public/add", {
        userName: formData.userName,
        password: formData.password,
      });

      if (response.status === 200) {
        console.log("User successfully registered 😊");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something Went Wrong! 😒");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <Heading title="Register"/>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Join Our Lam Family</p>
        <p className="message">Signup now and get full access to our Lam. </p>
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
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <span>Username</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="email"
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="password"
            className="input"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="password"
            className="input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span>Confirm password</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <Link to="/">Signin</Link>{" "}
        </p>
      </form>
    </>
  );
}

export default Register;
