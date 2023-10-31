import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmpRepByGroup.css'; // Import your CSS file

export default function EmpRepByGroup() {
  const [selectedPayGrade, setSelectedPayGrade] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [employees, setEmployees] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Fetch pay grades, job titles, and statuses
  useEffect(() => {
    // Fetch Pay Grades
    axios
      .get('http://localhost:5001/paygrades')
      .then((response) => {
        setPayGrades(response.data.payGrades);
      })
      .catch((error) => {
        console.log('Error fetching pay grades:', error);
      });

    // Fetch Job Titles
    axios
      .get('http://localhost:5001/jobtitles')
      .then((response) => {
        setJobTitles(response.data.jobTitles);
      })
      .catch((error) => {
        console.log('Error fetching job titles:', error);
      });

    // Fetch Employee Statuses
    axios
      .get('http://localhost:5001/statuses')
      .then((response) => {
        setStatuses(response.data.statuses);
      })
      .catch((error) => {
        console.log('Error fetching statuses:', error);
      });
  }, []);

  const handlePayGradeSelect = (event) => {
    setSelectedPayGrade(event.target.value);
    setSelectedJobTitle(''); // Reset Job Title selection
    setSelectedStatus(''); // Reset Status selection
  };

  const handleJobTitleSelect = (event) => {
    setSelectedJobTitle(event.target.value);
    setSelectedPayGrade(''); // Reset Pay Grade selection
    setSelectedStatus(''); // Reset Status selection
  };

  const handleStatusSelect = (event) => {
    setSelectedStatus(event.target.value);
    setSelectedPayGrade(''); // Reset Pay Grade selection
    setSelectedJobTitle(''); // Reset Job Title selection
  };

  const handleRetrieveEmployees = (route, params) => {
    axios
      .get(`http://localhost:5001/${route}`, { params })
      .then((response) => {
        setEmployees(response.data.employees);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <div className="centered-container">
      <div className="employee-form">
        <h1>Employees by Group</h1>

        <label htmlFor="payGrade">Select Pay Grade:</label>
        <select
          id="payGrade"
          value={selectedPayGrade}
          onChange={handlePayGradeSelect}
        >
          <option value="">Select a pay grade</option>
          {payGrades.map((payGrade, index) => (
            <option key={index} value={payGrade}>
              {payGrade}
            </option>
          ))}
        </select>
        <button className="submit-button" onClick={() => handleRetrieveEmployees('employeesbypaygrade', { payGrade: selectedPayGrade })}>
          Retrieve Employees by Pay Grade
        </button>

        <label htmlFor="jobTitle">Select Job Title:</label>
        <select
          id="jobTitle"
          value={selectedJobTitle}
          onChange={handleJobTitleSelect}
        >
          <option value="">Select a job title</option>
          {jobTitles.map((jobTitle, index) => (
            <option key={index} value={jobTitle}>
              {jobTitle}
            </option>
          ))}
        </select>
        <button className="submit-button" onClick={() => handleRetrieveEmployees('employeesbyjobtitle', { jobTitle: selectedJobTitle })}>
          Retrieve Employees by Job Title
        </button>

        <label htmlFor="status">Select Employee Status:</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={handleStatusSelect}
        >
          <option value="">Select an employee status</option>
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button className="submit-button" onClick={() => handleRetrieveEmployees('employeesbystatus', { status: selectedStatus })}>
          Retrieve Employees by Status
        </button>
      </div>

      {employees.length > 0 && (
        <div className="selected-department">
          <p>Retrieved Employees:</p>
          <ul>
            {employees.map((employee, index) => (
              <li key={index}>{employee}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
