import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigation = useNavigate();
  const [text, setText] = useState({
    username: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username && !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      let detail = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(detail);
      let finalData = await detail.json();
      console.log(finalData);
      let user = finalData.find((element) => {
        return element.username === username && element.password === password;
      });
      console.log(user);
      if (user) {
        navigation("/form-validation");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  const { username, password } = text;

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit} className="login-form">
        <div className="login-input">
          <label>Username</label>
          <input
            type="text"
            id="login"
            placeholder="Enter your username"
            onChange={handleInputChange}
            value={username}
            name="username"
          />
        </div>
        <div className="login-input">
          <label>Password</label>
          <input
            type="password"
            id="pwd"
            placeholder="Enter your password"
            onChange={handleInputChange}
            value={password}
            name="password"
          />
        </div>
        <div className="login-submit">
          <button type="submit">Login</button>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
