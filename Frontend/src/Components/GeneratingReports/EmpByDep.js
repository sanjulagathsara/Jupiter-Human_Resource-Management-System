import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmpByDep.css";
import { useNavigate } from "react-router-dom";

export default function EmpByDep() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [employeeDepartments, setEmployeeDepartments] = useState([]);
  const [employeesInDepartment, setEmployeesInDepartment] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchEmployeeDepartments();
  }, []);

  const fetchEmployeeDepartments = () => {
    axios
      .get("http://localhost:5001/employeedepartments")
      .then((response) => {
        if (response.data.departments) {
          setEmployeeDepartments(response.data.departments);
          console.log(
            "Retrieved Employee Departments:",
            response.data.departments
          );
        } else {
          setError("No departments found.");
        }
      })
      .catch((error) => {
        setError("Error fetching employee departments: " + error.message);
      });
  };

  const handleDepartmentSelect = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedDepartment) {
      axios
        .get("http://localhost:5001/employeesbydepartment", {
          params: { department: selectedDepartment },
        })
        .then((response) => {
          if (response.data) {
            setEmployeesInDepartment(response.data);
          } else {
            setEmployeesInDepartment([]);
          }
        })
        .catch((error) => {
          setError("Error fetching employees: " + error.message);
        });
    }
  };

  return (
    <div className="centered-container">
      <h1 className="main-title">Employees by Department</h1>
      <div className="employee-form">
        <label htmlFor="department">Select Department:</label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={handleDepartmentSelect}
        >
          <option value="">Select a department</option>
          {employeeDepartments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
        <button className="button-style" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {error && <p className="error-message">Error: {error}</p>}
      {selectedDepartment && (
        <div className="selected-department">
          <div>
            {employeesInDepartment.map((employee, index) => (
              <div className="employee-box" key={index}>
                <p>Employee ID: {employee.employee_id}</p>
                <p>Name: {employee.name}</p>
                <p>Gender: {employee.gender}</p>
                <p>Department: {employee.department}</p>
                <p>Job Title: {employee.job_title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="btn" onClick={goBack}>
        Go Back
      </button>
    </div>
  );
}
