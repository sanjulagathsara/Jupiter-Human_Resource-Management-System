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
    organizationId: "",
    name: "",
    birthday: "",
    contactNumber: "",
    maritalStatus: "",
    supervisorId: "",
    statusID: "",
    jobTitleId: "",
    payGradeId: "",
  });

  const organizations = ["Jupiter", "XYZ Ltd", "PQR Inc"];
  const organizationDict = {
    Jupiter: "OR001",
    "XYZ Ltd": "OR002",
    "PQR Inc": "OR003",
  };
  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const supervisors = ["E001", "E003"];
  const statusList = [
    "Intern-fulltime",
    "Intern-Parttime",
    "Contract-fulltime",
    "Contract-parttime",
    "Permanent",
    "Freelance",
  ];
  const statusDict = {
    "Intern-fulltime": "S001",
    "Intern-Parttime": "S002",
    "Contract-fulltime": "S003",
    "Contract-parttime": "S004",
    Permanent: "S005",
    Freelance: "S006",
  };
  const jobTitleList = [
    "HR_Manager",
    "Supervisor",
    "Accountant",
    "Software Engineer",
    "QA Engineer",
  ];
  const jobTitleDict = {
    HR_Manager: "JT001",
    Supervisor: "JT002",
    Accountant: "JT003",
    "Software Engineer": "JT004",
    "QA Engineer": "JT005",
  };
  const payGradeList = ["Level 1", "Level 2", "Level 3"];
  const payGradeDict = {
    "Level 1": "PG001",
    "Level 2": "PG002",
    "Level 3": "PG003",
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const fetchdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/personalInfo");
      const data = await response.json();
      console.log(data);
      console.log("Data fetched from server");
      setRecord(data[0]);

      setPI({
        employeeId: data[0].Employee_ID,
        organizationId: data[0].Organization_Name,
        name: data[0].Name,
        birthday: new Date(record.Birthdate).toLocaleDateString(),
        contactNumber: data[0].Emergency_contact_Number,
        maritalStatus: data[0].Marital_status,
        supervisorId: data[0].Supervisor_Name,
        statusID: data[0].Status_Type,
        jobTitleId: data[0].Job_Title,
        payGradeId: data[0].Pay_Grade,
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
    alert("Form submitted");
    console.log("Form submitted:", {
      employeeId: PI.employeeId,
      organizationId: PI.organizationId,
      name: PI.name,
      birthday: PI.birthday,
      contactNumber: PI.contactNumber,
      maritalStatus: PI.maritalStatus,
      supervisorId: PI.supervisorId,
      statusID: PI.statusID,
      jobTitleId: PI.jobTitleId,
      payGradeId: PI.payGradeId,
    });
  };

  useEffect(() => {
    if (formSubmitted) {
      fetch("http://localhost:5000/api/ManUI/EditPI/edited", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: PI.employeeId,
          organizationId: PI.organizationId,
          name: PI.name,
          birthday: PI.birthday,
          contactNumber: PI.contactNumber,
          maritalStatus: PI.maritalStatus,
          supervisorId: PI.supervisorId,
          statusID: PI.statusID,
          jobTitleId: PI.jobTitleId,
          payGradeId: PI.payGradeId,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          console.log("Data sent to server");
        })
        .catch((error) => {
          console.log("Data not sent to serve");
        });
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  return (
    <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
      <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
        Personal Informations
      </h1>
      <form onSubmit={handleSubmit}>
        <tr>
          <label className="mb-3">
            Employee ID:
            <input
              type="text"
              value={PI.employeeId}
              onChange={(e) => setPI({ ...PI, employeeId: e.target.value })}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </tr>
        <tr>
          <label className="mb-3">
            Name:
            <input
              type="text"
              value={PI.name}
              onChange={(e) => setPI({ ...PI, name: e.target.value })}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </tr>
        <tr>
          <label className="mb-3">
            Organization Name:
            <select
              value={PI.organizationId}
              onChange={(e) =>
                setPI({
                  ...PI,
                  organizationId: organizationDict[e.target.value],
                })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select an organization</option>
              {organizations.map((org, index) => (
                <option key={index} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </label>
        </tr>
        <tr>
          <label className="mb-3">
            Birthday:
            <input
              type="date"
              value={PI.birthday}
              onChange={(e) => setPI({ ...PI, birthday: e.target.value })}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </tr>
        <tr>
          <label className="mb-3">
            Contact Number:
            <input
              type="tel"
              value={PI.contactNumber}
              onChange={(e) => setPI({ ...PI, contactNumber: e.target.value })}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </tr>
        <tr>
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
        </tr>
        <tr>
          <label className="mb-3">
            Job Title:
            <select
              value={PI.jobTitleId}
              onChange={(e) =>
                setPI({ ...PI, jobTitleId: jobTitleDict[e.target.value] })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select Job Title ID</option>
              {jobTitleList.map((jobTitle, index) => (
                <option key={index} value={jobTitle}>
                  {jobTitle}
                </option>
              ))}
            </select>
          </label>
        </tr>
        <tr>
          <label className="mb-3">
            Status:
            <select
              value={PI.statusID}
              onChange={(e) =>
                setPI({ ...PI, statusID: statusDict[e.target.value] })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select Status ID</option>
              {statusList.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </tr>
        <tr>
          <label className="mb-3">
            Pay Grade:
            <select
              value={PI.payGradeId}
              onChange={(e) =>
                setPI({ ...PI, payGradeId: payGradeDict[e.target.value] })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select Pay Grade ID</option>
              {payGradeList.map((payGrade, index) => (
                <option key={index} value={payGrade}>
                  {payGrade}
                </option>
              ))}
            </select>
          </label>
        </tr>
        {PI.jobTitleId !== "JT002" && (
          <tr>
            <label className="mb-3">
              Supervisor ID:
              <select
                value={PI.supervisorId}
                onChange={(e) => setPI({ ...PI, supervisorId: e.target.value })}
                style={{ marginLeft: "10px" }}
              >
                <option value="">Select a supervisor</option>
                {supervisors.map((supervisor, index) => (
                  <option key={index} value={supervisor}>
                    {supervisor}
                  </option>
                ))}
              </select>
            </label>
          </tr>
        )}
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
