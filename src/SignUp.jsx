import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  let navigation = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupSubmit = async(e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    if(password.length < 8){
      alert("Password must be at least 8 characters long");
      return;
    }

    if(username === "" && password === "" && confirmPassword === ""){
      alert("Please fill all fields");
      return;
    }
    console.log("Sign up");
    console.log(data);

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
        return element.username === username;
      });
      console.log(user);
      if(!user){
        fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        // localStorage.removeItem("user")
        alert("Sign up successful");
        navigation(-1);
      }else{
        // console.log(`${finalData.id}`)
        alert("Username already exists");
      }
      
    } catch (error) {
      console.log(error);
    }

    

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const { username, password, confirmPassword } = data;

  return (
    <div className="sign-up-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit} className="sign-up-form">
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            onChange={handleInputChange}
            value={username}
            name="username"
          />
        </div>
        <div className="input-container">
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
        <div className="input-container">
          <label>Confirm Password</label>
          <input
            type="password"
            id="pwd-confirm"
            placeholder="Confirm your password"
            onChange={handleInputChange}
            value={confirmPassword}
            name="confirmPassword"
          />
        </div>
        <div className="submit-sign-up">
          <button type="submit">Sign Up</button>
          <Link to="/">Login</Link>
        </div>
        
      </form>
    </div>
  );
};

export default SignUp;
