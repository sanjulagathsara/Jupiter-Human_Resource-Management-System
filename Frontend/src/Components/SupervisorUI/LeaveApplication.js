import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SupervisorUI.css";

const LeaveApplication = () => {
  const navigate = useNavigate();
  var type = "";
  const [record, setRecord] = useState([]);
  const [status, setStatus] = useState("false");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAccept = (i) => {
    const updatedRecord = [...record];
    updatedRecord[i].Approval_status = "Accepted";
    if (status === "false") {
      setStatus("true");
    } else {
      setStatus("false");
    }
    axios
      .post("http://localhost:5001/api/SupUI/edited/leaveApplications", {
        status: "Accepted",
        record: updatedRecord[i],
      })
      .then((response) => {
        console.log("Record accepted and sent to the server");
        console.log(record);
        setErrorMessage(response.data.message);
      })
      .catch((err) => {
        console.error("Error sending record to the server", err);
      });
  };

  const handleReject = (i) => {
    const updatedRecord = [...record];
    updatedRecord[i].Approval_status = "Rejected";
    if (status === "false") {
      setStatus("true");
    } else {
      setStatus("false");
    }

    axios
      .post("http://localhost:5001/api/SupUI/edited/leaveApplications", {
        status: "Rejected",
        record: updatedRecord[i],
      })
      .then((response) => {
        console.log("Record rejected and sent to the server");
        setErrorMessage(response.data.message);
      })
      .catch((err) => {
        console.error("Error sending record to the server", err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (
          (response.data.valid && response.data.role === "JT003") ||
          response.data.role === "JT004" ||
          response.data.role === "JT009" ||
          response.data.role === "JT005"
        ) {
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/SupUI/leaveApplications")
      .then((response) => {
        setRecord(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);

  return (
    <div className="Instead_body_LA">
      <br />
      <br />
      <h1>
        <b>Leave Application</b>
      </h1>
      <br />
      <table className="tabled">
        <thead>
          <tr>
            <th scope="col">Leave Application ID</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Leave Type</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Remaining Relavent Type Leave Count</th>
            <th scope="col">Accept / Reject</th>
          </tr>
        </thead>
        <tbody>
          {record.map((item, i) => (
            <tr key={i}>
              <td>{item.Leave_Application_No}</td>
              <td>{item.Employee_ID}</td>
              <td>{item.LeaveType}</td>
              <td>{item.Start_Date.split("T")[0]}</td>
              <td>{item.End_Date.split("T")[0]}</td>
              <td>
                Remaining {item.LeaveType} Leave Count:{" "}
                {item.LeaveType === "Annual"
                  ? (type = item.Remaining_Annual_Leave_Count)
                  : item.LeaveType === "Casual"
                  ? (type = item.Remaining_Casual_Leave_Count)
                  : item.LeaveType === "Maternity"
                  ? (type = item.Remaining_Maternity_Leave_Count)
                  : item.LeaveType === "No-pay"
                  ? (type = item.Remaining_No_pay_Leave_Count)
                  : (type = "")}
              </td>
              <td>
                <button
                  type="button"
                  disabled={type <= 0 ? true : false}
                  onClick={() => handleAccept(i)}
                  className="btn btn-success"
                  style={{
                    // color: "white",
                    // fontSize: "16px",
                    marginRight: "5px",
                    // marginTop: "20px",
                  }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(i)}
                  className="btn btn-warning"
                  style={{
                    //color: "white",
                    //fontSize: "16px",
                    marginRight: "5px",
                    //marginTop: "20px",
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button
        onClick={goBack}
        type="button"
        className="btn"
        style={{
          marginRight: "50px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Back
      </button>
      <br />
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;
