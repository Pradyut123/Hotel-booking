import React, { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import icon1 from "../../assets/flag.png";
import icon2 from "../../assets/question.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="container">
      <title>Sign In or Create an Account</title>
      <div className="navbar-main">
        <NavLink to="/" className="navbar-brand">
          HotelBooking
        </NavLink>
        <div className="navbar-icons">
          <img src={icon1} alt="icon 1" className="navbar-icon" />
          <img src={icon2} alt="icon 2" className="navbar-icon" />
        </div>
      </div>
      <form className="main-form">
        <h3>Sign In to book hotels</h3>
        <span className="label">Email Address:</span>
        <input
          className="input-form"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required
          onChange={handleChange}
        />
        <span className="label">Password:</span>
        <input
          className="input-form"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleClick} className="btn-blue">
          Sign In
        </button>
        {error && <span>{error.message}</span>}
        <p className="register-link">
          Don't have an Account?{" "}
          <NavLink to="" style={{ textDecoration: "none" }}>
            Sign Up
          </NavLink>
        </p>
        <div className="lines"></div>
        <hr className="grayLines" />
        <p className="lowerTexts">
          By signing in or creating an account you agree with our
          <NavLink className="blue-link">Terms &amp; Conditions</NavLink> and
          <NavLink className="blue-link">Privacy Statement</NavLink>.
        </p>
        <hr className="grayLines" />
        <p className="lowerTexts">
          All rights reserved.
          <br />
          Copyright(2006-2023)-Booking.com
        </p>
      </form>
    </div>
  );
};

export default Login;
