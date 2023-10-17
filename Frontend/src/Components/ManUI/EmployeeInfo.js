import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeInfo = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/employeeInfo")
      .then((response) => response.json())
      .then((data) => {
        setColumns(Object.keys(data[0]));
        setRecords(data);
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  return (
    <div>
      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Employee Information
        </h1>
        <table className="table table-bordered" style={{ width: "70%" }}>
          <thead className="thead-dark">
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                {columns.map((column, index) => (
                  <td key={index}>{record[column]}</td>
                ))}
                <td>
                  <Link
                    to="/login/Employee/ManUI/ViewEmployee"
                    style={{ color: "white" }}
                  >
                    <button
                      className="btn btn-success"
                      onClick={() => handleButtonClick(record.Employee_ID)}
                      style={{ marginRight: "5px" }}
                    >
                      View
                    </button>
                  </Link>
                  <Link
                    to="/login/Employee/ManUI/EditEmployee"
                    style={{ color: "white" }}
                  >
                    <button
                      className="btn btn-warning"
                      onClick={() => handleButtonClick(record.Employee_ID)}
                    >
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={goBack}
            type="button"
            className="btn btn-primary"
            style={{
              color: "white",
              fontSize: "16px",
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );

  function handleButtonClick(employeeId) {
    fetch("http://localhost:5001/api/send-employee-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Employee_ID: employeeId }),
    })
      .then((data) => {
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  }
};

export default EmployeeInfo;
