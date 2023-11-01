import React from 'react';
import { Link } from 'react-router-dom';
import './ReportUI.css';

function ReportUI() {
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
    </div>
 
  );
}

export default ReportUI;
