import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <button
        onClick={handleAddHRManager}
        className="btn btn-primary"
        style={{ marginBottom: "10px", marginTop: "10px", marginRight: "10px" }}
      >
        Add HR Manager
      </button>
      <br />
      <button onClick={handleLogOut} className="btn btn-primary">
        Log Out
      </button>
    </div>
  );
};

export default AdminUI;
