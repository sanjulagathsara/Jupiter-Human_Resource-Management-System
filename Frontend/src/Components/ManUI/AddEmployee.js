import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const AddEmployee = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const formRef = useRef(null);
  const [employeeId, setEmployeeId] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [supervisorId, setSupervisorId] = useState("");
  const [statusID, setStatusID] = useState("");
  const [jobTitleId, setJobTitleId] = useState("");
  const [payGradeId, setPayGradeId] = useState("");

  const organizations = ["OR001", "OR002", "OR003"];
  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const supervisors = ["E001", "E003"];
  const statusList = ["S001", "S002", "S003", "S004", "S005"];
  const jobTitleList = ["JT001", "JT002", "JT003", "JT004", "JT005"];
  const payGradeList = ["PG001", "PG002", "PG003", "PG004", "PG005"];
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    alert("Form submitted");
    formRef.current.reset();
    console.log("Form submitted:", {
      employeeId,
      organizationId,
      name,
      birthday,
      contactNumber,
      maritalStatus,
      supervisorId,
    });
  };

  useEffect(() => {
    if (formSubmitted) {
      fetch("http://localhost:5000/api/employee/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employeeId,
          organizationId: organizationId,
          name: name,
          birthday: birthday,
          contactNumber: contactNumber,
          maritalStatus: maritalStatus,
          supervisorId: supervisorId,
          statusID: statusID,
          jobTitleId: jobTitleId,
          payGradeId: payGradeId,
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
    <div>
      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Personal Informations
        </h1>
        <form onSubmit={handleSubmit} ref={formRef}>
          <tr>
            <label className="mb-3">
              Employee ID:
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </label>
          </tr>
          <tr>
            <label className="mb-3">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </tr>
          <tr>
            <label className="mb-3">
              Organization ID:
              <select
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
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
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </label>
          </tr>
          <tr>
            <label className="mb-3">
              Contact Number:
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </label>
          </tr>
          <tr>
            <label className="mb-3">
              Marital Status:
              <select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <option value="">Select marital status</option>
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
              Supervisor ID:
              <select
                value={supervisorId}
                onChange={(e) => setSupervisorId(e.target.value)}
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
          <tr>
            <label className="mb-3">
              Status ID:
              <select
                value={statusID}
                onChange={(e) => setStatusID(e.target.value)}
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
              Job Title ID:
              <select
                value={jobTitleId}
                onChange={(e) => setJobTitleId(e.target.value)}
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
              Pay Grade ID:
              <select
                value={payGradeId}
                onChange={(e) => setPayGradeId(e.target.value)}
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
