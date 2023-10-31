import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RepByDepStatus.css'; // Import your CSS file

function RepByDeptStatus() {
  const [Dependantstatus, setDependantstatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetchDependantStatus();
  }, []);

  const fetchDependantStatus = () => {
    axios
      .get('http://localhost:5001/dependantstatus')
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Network response was not OK');
        }
      })
      .then((data) => {
        setDependantstatus(data.dependantstatus);
      })
      .catch((error) => {
        console.error('Error fetching dependant statuses:', error);
      });
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedStatus) {
      axios
        .get('http://localhost:5001/reports-by-dependants-status', {
          params: {
            depstatus: selectedStatus,
          },
        })
        .then((response) => {
          setEmployeeData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching employee data:', error);
        });
    } else {
      console.error('Please select a status before submitting.');
    }
  };

  return (
    <div className="centered-container">
      <h1>Employee Details with Dependents</h1>
      <div className="employee-form">
        <h2>Dependant Statuses:</h2>
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
        <button onClick={handleSubmit} className="submit-button">
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
                <div className="employee-name">
                  Employee Name: {employee['Name']}
                </div>
                <div className="dependant-details">
                  <div>Dependant Name: {employee['name']}</div>
                  <div>Relationship: {employee['Relationship']}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RepByDeptStatus;
