import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmpUI.css";

const EmployeeUI = () => {
  const navigate = useNavigate();
  const handleViewPersonalInfo = () => {
    navigate("/login/Employee/EmployeeUI/PersonalInfo");
  };

  const handleRequestLeave = () => {
    navigate("request-leave");
  };

  const handleBack = () => {
    navigate("/login/Employee");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/login/Employee/EmployeeUI" className="navbar-brand">
            Home
          </Link>
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
                  to="/login/Employee/EmployeeUI/PersonalInfo"
                  className="nav-link"
                >
                  View Personal Info
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/EmployeeUI/request-leave"
                  className="nav-link"
                >
                  Request Leave
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login/Employee" className="nav-link">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h1>Employee</h1>
      <div className="d-flex flex-column align-items-center justify-content-center gradient-bg bg-primary vh-100 text-center">
        <button
          type="button"
          class="button-with-icon"
          onClick={handleViewPersonalInfo}
        >
          View Personal Info
        </button>
        <button
          type="button"
          class="button-with-icon"
          onClick={handleRequestLeave}
        >
          Request Leave
        </button>
        <button type="button" class="button-with-icon" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default EmployeeUI;
