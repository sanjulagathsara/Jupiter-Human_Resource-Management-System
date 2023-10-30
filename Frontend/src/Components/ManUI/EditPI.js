import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManUI.css";

const EditPI = () => {
  const [jobTitleList, setJobTitleList] = useState([]);
  const [payGradeList, setPayGradeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const genderList = ["Male", "Female"];
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid && response.data.role === "JT002") {
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
    const fetchJobTitleList = async () => {
      const response = await axios.get("http://localhost:5001/api/jobTitle");
      console.log(response.data);
      setJobTitleList(response.data.map((item) => item.Job_Title));
    };
    fetchJobTitleList();

    const fetchStatusList = async () => {
      const response2 = await axios.get("http://localhost:5001/api/status");
      console.log(response2.data);
      setStatusList(response2.data.map((item) => item.Status_Type));
    };
    fetchStatusList();

    const fetchPayGradeList = async () => {
      const response1 = await axios.get("http://localhost:5001/api/payGrade");
      console.log(response1.data);
      setPayGradeList(response1.data.map((item) => item.Pay_Grade));
    };
    fetchPayGradeList();

    const fetchBranchList = async () => {
      const response = await axios.get("http://localhost:5001/api/branch");
      console.log(response.data);
      setBranchList(response.data.map((item) => item.Branch_Name));
    };
    fetchBranchList();

    const DepartmentList = async () => {
      const response = await axios.get("http://localhost:5001/api/department");
      console.log(response.data);
      setDepartmentList(response.data.map((item) => item.Department_Name));
    };
    DepartmentList();
  }, []);

  //get informations of login employee
  const [record, setRecord] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/personalInfo");
        const data = await response.json();
        console.log(data);
        console.log("Data fetched from server");
        setRecord(data[0]);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchdata();
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    console.log("Form submitted:", {
      employeeId: record.Employee_ID,
    });
  };

  useEffect(() => {
    const sendEditedDataToServer = async () => {
      try {
        if (formSubmitted) {
          const response = await fetch(
            "http://localhost:5001/api/ManUI/EditPI/edited",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                EmployeeID: record.Employee_ID,
                Name: record.Name,
                Branch_Name: record.Branch_Name,
                Birthday: record.Birthday,
                ContactNumber: record.Emergency_contact_Number,
                MaritalStatus: record.Marital_status,
                Job_Title: record.Job_Title,
                Status: record.Status_Type,
                PayGrade: record.Pay_grade,
                Supervisor: record.Supervisor_Name,
                Department: record.Department,
                Gender: record.Gender,
              }),
            }
          );
          console.log(response);
          if (response.ok) {
            setErrorMessage("Successfully Edited");
          } else {
            setErrorMessage("Error occurred");
          }

          setFormSubmitted(false);
        }
      } catch (error) {
        setErrorMessage("Error occurred");
        console.error("An error occurred:", error);
      }
    };

    sendEditedDataToServer();
  }, [formSubmitted]);

  return (
    <div className="Instead_body_EPI">
      <h1 style={{ marginBottom: "20px", marginTop: "50px" }}><b>
        Personal Informations
      </b></h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <label className="mb-3">
          Name:
          <input
            required
            type="text"
            value={record.Name}
            onChange={(e) => setRecord({ ...record, Name: e.target.value })}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Birthday:
          <input
            required
            type="date"
            value={
              record.Birthday
                ? new Date(record.Birthday).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setRecord({
                ...record,
                Birthday: e.target.value,
              })
            }
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Gender:
          <select
            required
            value={record.Gender}
            onChange={(e) => {
              setRecord({ ...record, Gender: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            {genderList.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Branch:
          <select
            required
            value={record.Branch_Name}
            onChange={(e) => {
              setRecord({ ...record, Branch_Name: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            {branchList.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Department:
          <select
            required
            value={record.Department}
            onChange={(e) => {
              setRecord({ ...record, Department: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            {departmentList.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Contact Number:
          <input
            required
            type="tel"
            value={record.Emergency_contact_Number}
            onChange={(e) =>
              setRecord({ ...record, Emergency_contact_Number: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Marital Status:
          <select
            required
            value={record.Marital_status}
            onChange={(e) =>
              setRecord({ ...record, Marital_status: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
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
          <span style={{ marginLeft: "10px" }}>{record.Job_Title}</span>
        </label>

        <br />

        <label className="mb-3">
          Status:
          <select
            required
            value={record.Status_Type}
            onChange={(e) =>
              setRecord({ ...record, Status_Type: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
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
            required
            value={record.Pay_grade}
            onChange={(e) =>
              setRecord({ ...record, Pay_grade: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
            {payGradeList.map((payGrade, index) => (
              <option key={index} value={payGrade}>
                {payGrade}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div className="mb-3">
          <p className="text-danger">{errorMessage}</p>
        </div>

        <button onClick={goBack} type="button" className="btn">
          Back
        </button>

        <button className="btn" type="submit" value="Submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPI;
