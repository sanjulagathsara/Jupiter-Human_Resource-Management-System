import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditPI = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const goBack = () => {
    navigate(-1);
  };

  const [PI, setPI] = useState({
    employeeId: "",
    name: "",
    birthday: "",
    contactNumber: "",
    maritalStatus: "",
    supervisorId: "",
    status: "",
    jobTitle: "",
    payGrade: "",
  });

  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const supervisors = ["Kavindu Dasun", "Yasantha Jayalath"];
  const statusList = [
    "Intern-fulltime",
    "Intern-Parttime",
    "Contract-fulltime",
    "Contract-parttime",
    "Permanent",
    "Freelance",
  ];

  const jobTitleList = [
    "HR_Manager",
    "Supervisor",
    "Accountant",
    "Software Engineer",
    "QA Engineer",
  ];

  const payGradeList = ["Level 1", "Level 2", "Level 3"];

  const [formSubmitted, setFormSubmitted] = useState(false);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }
  const fetchdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/personalInfo");
      const data = await response.json();
      console.log(data);
      console.log("Data fetched from server");
      setRecord(data[0]);

      setPI({
        employeeId: data[0].Employee_ID,

        name: data[0].Name,
        //birthday: formatDate(data[0].record.Birthdate),
        contactNumber: data[0].Emergency_contact_Number,
        maritalStatus: data[0].Marital_status,
        supervisorId: data[0].Supervisor_Name,
        status: data[0].Status_Type,
        jobTitle: data[0].Job_Title,
        payGrade: data[0].Pay_Grade,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    console.log("Form submitted:", {
      employeeId: PI.employeeId,

      name: PI.name,
      birthday: PI.birthday,
      contactNumber: PI.contactNumber,
      maritalStatus: PI.maritalStatus,
      supervisorId: PI.supervisorId,
      status: PI.status,
      jobTitle: PI.jobTitle,
      payGrade: PI.payGrade,
    });
  };

  useEffect(() => {
    const sendEditedDataToServer = async () => {
      try {
        if (formSubmitted) {
          const response = await fetch(
            "http://localhost:5000/api/ManUI/EditPI/edited",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                employeeId: PI.employeeId,

                name: PI.name,
                birthday: PI.birthday,
                contactNumber: PI.contactNumber,
                maritalStatus: PI.maritalStatus,
                supervisorId: PI.supervisorId,
                status: PI.status,
                jobTitle: PI.jobTitle,
                payGrade: PI.payGrade,
              }),
            }
          );

          if (response.ok) {
            console.log("Edited Data sent to server:");
          } else {
            console.log("Data not sent to server");
          }

          setFormSubmitted(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    sendEditedDataToServer();
  }, [formSubmitted]);

  return (
    <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
      <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
        Personal Informations
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="mb-3">
          Name:
          <input
            type="text"
            value={PI.name}
            onChange={(e) => setPI({ ...PI, name: e.target.value })}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Birthday:
          <input
            type="date"
            value={PI.birthday}
            onChange={(e) => setPI({ ...PI, birthday: e.target.value })}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label className="mb-3">
          Contact Number:
          <input
            type="tel"
            value={PI.contactNumber}
            onChange={(e) => setPI({ ...PI, contactNumber: e.target.value })}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Marital Status:
          <select
            value={PI.maritalStatus}
            onChange={(e) => setPI({ ...PI, maritalStatus: e.target.value })}
            style={{ marginLeft: "10px" }}
          >
            <option value="">{PI.maritalStatus}</option>
            {maritalStatusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Job Title:
          <select
            value={PI.jobTitle}
            onChange={(e) => setPI({ ...PI, jobTitle: e.target.value })}
            style={{ marginLeft: "10px" }}
          >
            <option value="">{PI.jobTitle}</option>
            {jobTitleList.map((jobTitle, index) => (
              <option key={index} value={jobTitle}>
                {jobTitle}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Status:
          <select
            value={PI.status}
            onChange={(e) => setPI({ ...PI, status: e.target.value })}
            style={{ marginLeft: "10px" }}
          >
            <option value="">{PI.status}</option>
            {statusList.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Pay Grade:
          <select
            value={PI.payGrade}
            onChange={(e) => setPI({ ...PI, payGrade: e.target.value })}
            style={{ marginLeft: "10px" }}
          >
            <option value="">{PI.payGrade}</option>
            {payGradeList.map((payGrade, index) => (
              <option key={index} value={payGrade}>
                {payGrade}
              </option>
            ))}
          </select>
        </label>
        <br />
        {PI.jobTitle !== "HR_Manager" && (
          <label className="mb-3">
            Supervisor ID:
            <select
              value={PI.supervisorId}
              onChange={(e) => setPI({ ...PI, supervisorId: e.target.value })}
              style={{ marginLeft: "10px" }}
            >
              <option value="">{PI.supervisorId}</option>
              {supervisors.map((supervisor, index) => (
                <option key={index} value={supervisor}>
                  {supervisor}
                </option>
              ))}
            </select>
          </label>
        )}
        <br />
        <button
          onClick={goBack}
          type="button"
          className="btn btn-primary"
          style={{
            color: "white",
            fontSize: "16px",
            marginRight: "50px",
            marginTop: "20px",
          }}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          value="Submit"
          style={{ marginTop: "20px" }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPI;
