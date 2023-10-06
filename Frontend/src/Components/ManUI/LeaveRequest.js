import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const LeaveRequest = () => {
  const [record, setRecord] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/leaveRequest").then((res) => {
      console.log("success");
      console.log(res);
      setRecord(res.data[0]);
      console.log(record.Employee_ID);
    });
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const [leaveType, setLeaveType] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/leaveTypes").then((res) => {
      console.log("success");
      console.log(res);
      setLeaveType(res.data.map((item) => item.LeaveType));
    });
  }, []);

  useEffect(() => {
    const sendLeaveRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/leaveRequest",
          {
            LeaveType: selectedOption,
          }
        );
        console.log("Leave details sent from frontend", response.data);
      } catch (error) {
        console.error("Error sending leave request", error);
      }
    };
    if (submit) sendLeaveRequest();
  }, [submit]);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
    console.log("Selected Option:", selectedOption);
  };

  return (
    <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
      <h1>Leave Request Form</h1>
      <h2>Employee ID : {record.Employee_ID}</h2>
      <h2>
        Remaining Maternity Leave count :{" "}
        {record.Remaining_Maternity_Leave_Count}
      </h2>
      <h2>
        Remaining No Pay Leave count : {record.Remaining_No_pay_Leave_Count}
      </h2>
      <h2>
        Remaining Annual Leave count : {record.Remaining_Annual_Leave_Count}
      </h2>
      <h2>
        Remaining Casual Leave count : {record.Remaining_Casual_Leave_Count}
      </h2>

      {
        <form onSubmit={handleSubmit}>
          <label>Select Leave Type:</label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="">Select Type</option>
            {leaveType.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
          <label>Start Date:</label>
          <input type="date" id="start" name="start" />
          <br />
          <label>End Date:</label>
          <input type="date" id="end" name="end" />
          <br />
          <button type="submit">Submit</button>
        </form>
      }
    </div>
  );
};

export default LeaveRequest;
