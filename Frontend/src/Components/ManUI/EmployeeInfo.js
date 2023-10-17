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
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
      <h1 className="my-4">Employee Information</h1>

      {records.map((record, i) => (
        <div
          key={i}
          className="card p-3 my-2 mx-auto"
          style={{ width: "45%" } }
        >
          <h5>Employee ID: {record.Employee_ID}</h5>
          <h5>Name: {record.Name}</h5>
          <div className="d-flex justify-content-center">
            <Link
              to="/login/Employee/ManUI/ViewEmployee"
              style={{ color: "white" }}
            >
              <button
                className="btn btn-success mx-2"
                onClick={() => sendEmployeeId(record.Employee_ID)}
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
                onClick={() => sendEmployeeId(record.Employee_ID)}
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center">
        <button
          onClick={goBack}
          type="button"
          className="btn btn-primary mt-4"
        >
          Back
        </button>
      </div>
    </div>
  );
};

const sendEmployeeId = (employeeId) => {
  fetch("http://localhost:5001/api/send-employee-id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Employee_ID: employeeId }),
  })
    .then((data) => {
      console.log("Success");
    })
    .catch((error) => {
      console.log("Error");
    });
};

export default EmployeeInfo;
