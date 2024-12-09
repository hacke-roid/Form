import React, { useState } from "react";
// import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";
import './App.css'

const ReactForm = () => {
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: "",
    password: "",
    confirmPassword: "",
    gender: "",
    skills: [],
    birthDate: "",
  });

  let [errors, setErrors] = useState({});

  let isValidEmail = (email) => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  let isValidPhoneNumber = (phoneNumber) => {
    let phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  let isValidAge = (age) => {
    return age >= 18 && age <= 100;
  };

  let validation = (formData) => {
    let errors = {};

    if (!formData.firstName) {
      errors.firstName = "firstName is required";
    }
    if (!formData.lastName) {
      errors.lastName = "lastName is required";
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = "Number is not valid";
    }

    if (!formData.email) {
      errors.email = "email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "email is not valid";
    }

    if (!formData.age) {
      errors.age = "age is required";
    } else if (!isValidAge(formData.age)) {
      errors.age = "age must be greater than 18 and less than 100";
    }

    if (!formData.gender) {
      errors.gender = "please choose atleast one gender";
    }

    if (formData.skills.length == 0) {
      errors.skills = "please select any one skills";
    }

    console.log(errors);

    return errors;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setErrors(validation(formData));
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // console.log(data)
  };

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let handleBoxChange = (e) => {
    let { name, checked } = e.target;

    let updatedSkills = [...formData.skills];

    if (checked) {
      updatedSkills.push(name);
    } else {
      updatedSkills = updatedSkills.filter((skill) => skill !== name);
    }

    setFormData({ ...formData, skills: updatedSkills });
  };

  let {
    firstName,
    lastName,
    email,
    phoneNumber,
    age,
    gender,
    skills,
    password,
    confirmPassword,
    birthDate,
  } = formData;

  return (
    <section className="container">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <h1>React Form</h1>
        </div>

        <label htmlFor="">
          firstName :
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="enter your firstName"
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </label>

        <label htmlFor="">
          lastName :
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="enter your lastName"
          />
        </label>

        <label htmlFor="">
          phoneNumber :
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="enter your number"
          />
        </label>

        <label htmlFor="">
          email :
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="enter your email"
          />
        </label>

        <label htmlFor="">
          age :
          <input
            type="number"
            name="age"
            value={age}
            onChange={handleChange}
            placeholder="enter your age"
          />
        </label>

        <label htmlFor="" className="genderConatiner">
          <span>Gender : </span>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
          />{" "}
          FeMale
        </label>

        <div className="skillsItems">
          <label htmlFor="">Skills: </label>
          <input type="checkbox" onChange={handleBoxChange} name="mongoDB" />
          MongoDB
          <input type="checkbox" onChange={handleBoxChange} name="javascript" />
          Javascript
          <input type="checkbox" onChange={handleBoxChange} name="Reactjs" />
          Reactjs
          <input type="checkbox" onChange={handleBoxChange} name="nodejs" />
          Nodejs
          <input type="checkbox" onChange={handleBoxChange} name="css" />
          CSS
        </div>

        <label htmlFor="">
          birthDate
          <input
            type="date"
            name="birthDate"
            onChange={handleChange}
            value={birthDate}
          />
        </label>

        <label htmlFor="">
          password :
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="enter your password"
            value={password}
          />
        </label>

        <label htmlFor="">
          {" "}
          Confirmpassword :
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="enter your password"
            value={confirmPassword}
          />
        </label>

        <button type="submit" className="btn_submit">
          submit
        </button>
        <button type="reset" className="btn_reset">
          cancel
        </button>
      </form>
      <div className="saved-data-btn">
        <Link
          to="/savedata"
          style={{
            textDecoration: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Saved Data
        </Link>
      </div>
    </section>
  );
};

export default ReactForm;
