import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bootsrap from "bootstrap/dist/css/bootstrap.min.css";

const EmployeeInfo = () => {
  const [column, setColumn] = useState([]);
  const [record, setRecord] = useState([]);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    fetch("http://localhost:5001/api/employeeInfo")
      .then((response) => response.json())
      .then((data) => {
        setColumn(Object.keys(data[0]));
        setRecord(data);
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  return (
    <div>
      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-200">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Employee Informations
        </h1>
        {record.map((record) => (
          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              width: "45%",
              display: "flex",
              flexDirection: "column", // Align children vertically
              alignItems: "center", // Center children horizontally
              // Center children horizontally
            }}
          >
            <div>
              <h5>Employee ID : {record.Employee_ID}</h5>
              <h5>Name : {record.Name}</h5>
              <Link
                to="/login/Employee/ManUI/ViewEmployee"
                style={{ color: "white" }}
              >
                <button
                  className="btn btn-success"
                  onClick={() => {
                    fetch("http://localhost:5001/api/send-employee-id", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ Employee_ID: record.Employee_ID }),
                    })
                      .then((data) => {
                        console.log("success");
                      })
                      .catch((error) => {
                        console.log("error");
                      });
                  }}
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
                  onClick={() => {
                    fetch("http://localhost:5001/api/send-employee-id", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ Employee_ID: record.Employee_ID }),
                    })
                      .then((data) => {
                        console.log("success");
                      })
                      .catch((error) => {
                        console.log("error");
                      });
                  }}
                >
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
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
};

export default EmployeeInfo;
