import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  axios.defaults.withCredentials = true;
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid) {
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match");
    } else {
      axios
        .post("http://localhost:5001/api/reset-password", {
          currentPassword: currentPassword,
          newPassword: newPassword,
        })
        .then((response) => {
          setErrorMessage(response.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
      setErrorMessage("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };
  return (
    <div className="Instead_body_Reset">
      <div class = "Content">
        <form onSubmit={handleSubmit} 
              style={{marginTop : "20px", marginBottom : "20px"}}>
          <div className="mb-3">
            <label htmlFor="current-password">Current Password:</label>
            <input
              required
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new-password">New Password:</label>
            <input
              required
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-new-password">Confirm New Password:</label>
            <input
              required
              type="password"
              id="confirm-new-password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
          </div>
          <br/>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="mb-3">
            Reset Password
          </button>
        </form>
      </div>
      <br/>
      <button onClick={goBack} className="btn">
        Go Back
      </button>
    </div>
  );
};

export default ResetPassword;
