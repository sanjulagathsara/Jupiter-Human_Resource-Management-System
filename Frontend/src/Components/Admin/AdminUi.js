import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminUi.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUI = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid) {
          navigate(`/login/Employee:${response.data.role}`);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleLogOut = () => {
    navigate("/login");
    axios.get("http://localhost:5001/api/logout");
  };
  const handleAddHRManager = () => {
    navigate("/login/Admin/AddHRManager");
  };

  return (
    <div className="Instead_body_AdminUI">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="/login/Employee/EmployeeUI/request-leave"
                  className="nav-link"
                >
                  Request Leave
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/EmployeeUI/PersonalInfo"
                  className="nav-link"
                >
                  View Personal Information
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login/Employee/reset-password" className="nav-link">
                  Reset Password
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={handleLogOut} className="nav-link">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="square">
        <p className="jupiter">
          <b>Admin UI</b>
        </p>
        <button
          onClick={handleAddHRManager}
          className="btn"
          style={{
            marginTop: "10px",
            marginRight: "10px",
          }}
        >
          Add HR Manager
        </button>
        <br />
        <button onClick={handleLogOut} className="btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminUI;
