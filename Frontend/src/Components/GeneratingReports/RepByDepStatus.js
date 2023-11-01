import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RepByDepStatus.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

function RepByDeptStatus() {
  const [Dependantstatus, setDependantstatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchDependantStatus();
  }, []);

  const fetchDependantStatus = () => {
    axios
      .get("http://localhost:5001/dependantstatus")
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Network response was not OK");
        }
      })
      .then((data) => {
        setDependantstatus(data.dependantstatus);
      })
      .catch((error) => {
        console.error("Error fetching dependant statuses:", error);
      });
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedStatus) {
      axios
        .get("http://localhost:5001/reports-by-dependants-status", {
          params: {
            depstatus: selectedStatus,
          },
        })
        .then((response) => {
          setEmployeeData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    } else {
      console.error("Please select a status before submitting.");
    }
  };

  return (
    <div className="centered-container">
      <h1 className="main-title">Dependant Status Report</h1>
      <div className="employee-form">
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="select-box"
        >
          <option value="">Select a status</option>
          {Dependantstatus.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit} className="button-style">
          Submit
        </button>
        <p>Selected Status: {selectedStatus}</p>
      </div>

      {employeeData.length > 0 && (
        <div className="selected-department">
          <h2>Dependants with Selected Status:</h2>
          <ul className="result-list">
            {employeeData.map((employee, index) => (
              <li key={index} className="result-item">
                <div className="employee-details">
                  <div>Employee Name: {employee["employee_name"]}</div>
                  <div>Dependant Name: {employee["name"]}</div>
                  <div>Relationship: {employee["Relationship"]}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="btn" onClick={goBack}>
        Back
      </button>
    </div>
  );
}

export default RepByDeptStatus;
