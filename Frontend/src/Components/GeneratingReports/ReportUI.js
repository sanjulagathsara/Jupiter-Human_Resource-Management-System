import React from "react";
import { Link } from "react-router-dom";
import "./ReportUI.css";
import { useNavigate } from "react-router-dom";

function ReportUI() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="centered-container">
      <div className="main-title">Reports</div>
      <Link to="/employee-by-department" className="button-style">
        Department Reports
      </Link>
      <Link to="/total-leaves-by-department" className="button-style">
        Leaves Reports
      </Link>
      <Link to="/employee-reports-by-group" className="button-style">
        Group Reports
      </Link>
      <Link to="/reports-by-custom-fields" className="button-style">
        Custom Reports
      </Link>
      <Link to="/reports-by-dependants-status" className="button-style">
        Dependant Reports
      </Link>
      <button className="btn" onClick={goBack}>
        Go Back
      </button>
    </div>
  );
}

export default ReportUI;
