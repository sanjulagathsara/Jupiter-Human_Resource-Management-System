import React from 'react';
import { Link } from 'react-router-dom';

function ReportUI() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Center vertically in the viewport
  };

  const buttonStyle = {
    width: '200px',
    padding: '10px',
    margin: '10px',
    background: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <Link to="/employee-by-department" style={buttonStyle}>
        Employee by Department
      </Link>
      <Link to="/total-leaves-by-department" style={buttonStyle}>
        Total Leaves by Department
      </Link>
      <Link to="/employee-reports-by-group" style={buttonStyle}>
        Employee Reports by Group
      </Link>
      <Link to="/reports-by-custom-fields" style={buttonStyle}>
        Reports by Custom Fields
      </Link>
      <Link to="/reports-by-dependants-status" style={buttonStyle}>
        Reports by Dependants Status
      </Link>
    </div>
  );
}

export default ReportUI;
