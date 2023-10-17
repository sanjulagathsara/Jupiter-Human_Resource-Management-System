import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewEmployee = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [record, setRecord] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/employeeInfo/employee")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecord(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
      <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>Personal Information</h1>

      {record.map((employee, i) => (
        <div
          key={i}
          style={{
            border: "2px solid black",
            padding: "20px",
            marginTop: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            width: "45%",
            display: "flex",
            flexDirection: "column", // Align children vertically
            alignItems: "center", // Center children horizontally
          }}
        >
          <h5>Employee ID: {employee.Employee_ID}</h5>
          <h5>Name: {employee.Name}</h5>
          <h5>Birthdate: {new Date(employee.Birthdate).toLocaleDateString()}</h5>
          <h5>Marital Status: {employee.Marital_status}</h5>
          <h5>Emergency Contact Number: {employee.Emergency_contact_Number}</h5>
          <h5>Status Type: {employee.Status_Type}</h5>
          <h5>Job Title: {employee.Job_Title}</h5>
          <h5>Pay Grade: {employee.Pay_Grade}</h5>

          {employee.Supervisor_Name !== null && (
            <h5>Supervisor Name: {employee.Supervisor_Name}</h5>
          )}
        </div>
      ))}

      <button
        onClick={goBack}
        type="button"
        className="btn btn-primary"
        style={{
          color: "white",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default ViewEmployee;
