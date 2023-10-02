import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="gradient-bg vh-100">
      <h1>Jupiter</h1>
      <h2>Human Resource Management System</h2>
      <p class="Type01">Login Using Your Account </p>
      <div className>
        <Link to="/login/Admin">
          <button className={"sparkle-button"}>Admin User</button>
        </Link>
      </div>
      <div className>
        <Link to="/login/Employee">
          <button className={"sparkle-button"}>Employee</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
