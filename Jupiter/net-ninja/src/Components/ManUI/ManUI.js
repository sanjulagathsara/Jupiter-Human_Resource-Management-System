import React from 'react';
import { Link } from 'react-router-dom';
import bootsrap from 'bootstrap/dist/css/bootstrap.min.css';

const ManUI = () => {
    return (<div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link to="/login/Employee/ManUI" className="navbar-brand">Home</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login/Employee/ManUI/personal-info" className="nav-link">Add Employee</Link>
          </li>
          <li className="nav-item">
            <Link to="/login/Employee/ManUI/request-leave" className="nav-link">View Employee</Link>
          </li>
          <li className="nav-item">
            <Link to="/login/Employee/ManUI/request-leave" className="nav-link">View My Details</Link>
          </li>
          <li className="nav-item">
            <Link to="/login/Employee/ManUI/request-leave" className="nav-link">View Reports</Link>
          </li>
          <li className="nav-item">
            <Link to="/login/" className="nav-link">Log Out</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  
  
  </div>);
}
 
export default ManUI;