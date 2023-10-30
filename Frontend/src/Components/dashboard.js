import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const image =
  "https://www.forbes.com/advisor/wp-content/uploads/2022/11/Image-12.jpg";

const Dashboard = () => {
  return (
    <div class="dashboard">
      <br/>
      <div>
        <p className="jupiter"><b>Jupiter</b></p>
        <p className = "subheading"><b>Human Resource Management System</b></p>
  
        <img src={image} className="image" alt="HR Management System" />
        <div>
          <span>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </span>
          <span>
            <Link to="/about">
              <button className= "btn">About</button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
