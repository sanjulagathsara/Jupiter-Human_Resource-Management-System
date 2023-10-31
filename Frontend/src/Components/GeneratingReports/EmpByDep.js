import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmpByDep.css'; // Import your CSS file

export default function EmpByDep() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [employeeDepartments, setEmployeeDepartments] = useState([]);
  const [employeesInDepartment, setEmployeesInDepartment] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeDepartments();
  }, []);

  const fetchEmployeeDepartments = () => {
    axios.get('http://localhost:5001/employeedepartments')
      .then((response) => {
        if (response.data.departments) {
          setEmployeeDepartments(response.data.departments);
          console.log('Retrieved Employee Departments:', response.data.departments);
        } else {
          setError('No departments found.');
        }
      })
      .catch((error) => {
        setError('Error fetching employee departments: ' + error.message);
      });
  };

  const handleDepartmentSelect = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedDepartment) {
      axios.get('http://localhost:5001/employeesbydepartment', { params: { department: selectedDepartment } })
        .then((response) => {
          if (response.data.employees) {
            setEmployeesInDepartment(response.data.employees);
            console.log('Retrieved Employees:', response.data.employees);
          } else {
            setEmployeesInDepartment([]);
          }
        })
        .catch((error) => {
          setError('Error fetching employees: ' + error.message);
        });
    }
  };

  return (
    <div className='centered-container'>
      <div className="employee-form">
        <h1>Employees by Department</h1>
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
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p className="error-message">Error: {error}</p>}
      {selectedDepartment && (
        <div className="selected-department">
          <p>Selected Department: {selectedDepartment}</p>
          <div>
            <p>Employees in the selected department:</p>
            <ul>
              {employeesInDepartment.map((employee, index) => (
                <li key={index}>{employee}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
