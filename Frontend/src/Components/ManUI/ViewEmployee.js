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
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);
  return (
    <div>
      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Personal Informations
        </h1>
        {record.map((record) => (
          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              marginTop: "50px",
              marginBottom: "50px",
              borderRadius: "10px",
              width: "45%",
              display: "flex",
              flexDirection: "column", // Align children vertically
              alignItems: "center", // Center children horizontally
              // Center children horizontally
            }}
          >
            <h5>Employee ID : {record.Employee_ID}</h5>
            <h5>Name : {record.Name}</h5>
            <h5>
              Birthdate : {new Date(record.Birthdate).toLocaleDateString()}
            </h5>
            <h5>Marital Status : {record.Marital_status}</h5>
            <h5>
              Emergency Contact Number : {record.Emergency_contact_Number}
            </h5>
            <h5>Status Type : {record.Status_Type}</h5>
            <h5>Job Title : {record.Job_Title}</h5>
            <h5>Pay Grade : {record.Pay_Grade}</h5>

            {record.Supervisor_Name !== null && (
              <h5>Supervisor_Name: {record.Supervisor_Name}</h5>
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
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewEmployee;
