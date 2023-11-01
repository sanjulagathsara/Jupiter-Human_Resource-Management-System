import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminUi.css";

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
