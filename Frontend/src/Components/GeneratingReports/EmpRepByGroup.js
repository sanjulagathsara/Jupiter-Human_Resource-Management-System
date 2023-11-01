import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmpRepByGroup.css";
import { useNavigate } from "react-router-dom";

export default function EmpRepByGroup() {
  const navigate = useNavigate();
  const [selectedPayGrade, setSelectedPayGrade] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [employees, setEmployees] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Fetch Pay Grades, Job Titles, and Employee Statuses
    const fetchData = async () => {
      try {
        const payGradesResponse = await axios.get(
          "http://localhost:5001/paygrades"
        );
        setPayGrades(payGradesResponse.data.payGrades || []);

        const jobTitlesResponse = await axios.get(
          "http://localhost:5001/jobtitles"
        );
        setJobTitles(jobTitlesResponse.data.jobTitles || []);

        const statusesResponse = await axios.get(
          "http://localhost:5001/statuses"
        );
        setStatuses(statusesResponse.data.statuses || []);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event, stateSetter, resetState1, resetState2) => {
    stateSetter(event.target.value);
    if (resetState1) {
      resetState1("");
    }
    if (resetState2) {
      resetState2("");
    }
  };

  const handleRetrieveEmployees = (route, params) => {
    axios
      .get(`http://localhost:5001/${route}`, { params })
      .then((response) => {
        setEmployees(response.data || []);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="centered-container">
      <h1 className="main-title">Employees by Pay Grade,Job Title,Status</h1>
      <div className="employee-form">
        <label htmlFor="payGrade">Select Pay Grade:</label>
        <select
          style={{ marginBottom: "10px" }}
          id="payGrade"
          value={selectedPayGrade}
          onChange={(event) =>
            handleSelectChange(
              event,
              setSelectedPayGrade,
              setSelectedJobTitle,
              setSelectedStatus
            )
          }
        >
          <option value="">Select a pay grade</option>
          {payGrades.map((payGrade) => (
            <option key={payGrade} value={payGrade}>
              {payGrade}
            </option>
          ))}
        </select>
        <button
          style={{ marginBottom: "10px" }}
          className="button-style"
          onClick={() =>
            handleRetrieveEmployees("employeesbypaygrade", {
              payGrade: selectedPayGrade,
            })
          }
        >
          Retrieve Employees by Pay Grade
        </button>

        <label htmlFor="jobTitle" style={{ marginBottom: "10px" }}>
          Select Job Title:
        </label>
        <select
          id="jobTitle"
          value={selectedJobTitle}
          onChange={(event) =>
            handleSelectChange(
              event,
              setSelectedJobTitle,
              setSelectedPayGrade,
              setSelectedStatus
            )
          }
        >
          <option value="">Select a job title</option>
          {jobTitles.map((jobTitle) => (
            <option key={jobTitle} value={jobTitle}>
              {jobTitle}
            </option>
          ))}
        </select>
        <button
          className="button-style"
          onClick={() =>
            handleRetrieveEmployees("employeesbyjobtitle", {
              jobTitle: selectedJobTitle,
            })
          }
        >
          Retrieve Employees by Job Title
        </button>

        <label htmlFor="status">Select Status : </label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(event) =>
            handleSelectChange(
              event,
              setSelectedStatus,
              setSelectedPayGrade,
              setSelectedJobTitle
            )
          }
        >
          <option value="">Select an employee status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          className="button-style"
          onClick={() =>
            handleRetrieveEmployees("employeesbystatus", {
              status: selectedStatus,
            })
          }
        >
          Retrieve Employees by Status
        </button>
      </div>

      {employees.length > 0 && (
        <div className="selected-department">
          <p>Retrieved Employees:</p>
          {employees.map((employee) => (
            <div className="employee-card" key={employee.employee_id}>
              <div className="employee-box">
                <p>Employee ID: {employee.employee_id}</p>
                <p>Name: {employee.name}</p>
                <p>Gender: {employee.gender}</p>
                <p>Department: {employee.department}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn" onClick={goBack}>
        Go Back
      </button>
    </div>
  );
}
