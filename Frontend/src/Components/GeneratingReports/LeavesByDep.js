import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeavesByDep.css'; // Import your CSS file

function LeavesByDep() {
  const [department, setDepartment] = useState('Customer Service');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveData, setLeaveData] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [showEmployeeBox, setShowEmployeeBox] = useState(false); // State to control whether to show the employee box

  useEffect(() => {
    fetch('http://localhost:5001/employeedepartments')
      .then((response) => response.json())
      .then((data) => {
        setDepartmentNames(data.departments);
      })
      .catch((error) => {
        console.error('Error fetching department names:', error);
      });
  }, []);

  const handleDepartmentSelect = (event) => {
    setDepartment(event.target.value);
  };

  const fetchTotalLeaves = () => {
    axios.get('http://localhost:5001/totalleavesbydepartment', {
      params: {
        department: department,
        startDate: startDate,
        endDate: endDate,
      },
    })
    .then((response) => {
      setLeaveData(response.data[0]);
      setShowEmployeeBox(true); // Show the employee box after retrieving data
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="centered-container">
      <h1 className='main-title'>Total Leaves by Department</h1>
      <div className="employee-form">
        <label htmlFor="department">Select Department:</label>
        <select id="department" value={department} onChange={handleDepartmentSelect}>
          <option value="">Select a department</option>
          {departmentNames.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
        <button className="button-style" onClick={fetchTotalLeaves}>Fetch Total Leaves</button>
      </div>
      {showEmployeeBox && leaveData && (
        <div className="results">
          <p>Total Leaves for {department}</p>
          <p>Total Maternity Leave: {leaveData.Maternity_Leave_Days}</p>
          <p>Total No-pay Leave: {leaveData.No_pay_Leave_Days}</p>
          <p>Total Annual Leave: {leaveData.Annual_Leave_Days}</p>
          <p>Total Casual Leave: {leaveData.Casual_Leave_Days}</p>
        </div>
      )}
    </div>
  );
}

export default LeavesByDep;
