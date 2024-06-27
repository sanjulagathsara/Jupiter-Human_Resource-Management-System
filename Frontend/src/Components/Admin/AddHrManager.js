import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddHrManager.css";

const AddHRManager = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid && response.data.role === "JT001") {
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
  const formRef = useRef(null);
  const [BranchList, setBranchList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [payGradeList, setpayGradeList] = useState([]);
  const [record, setRecord] = useState({
    Name: "",
    Branch_Name: "",
    Birthday: "",
    ContactNumber: "",
    MaritalStatus: "",
    Job_Title: "",
    Status: "",
    PayGrade: "",
    Supervisor: "",
    Department: "",
    Gender: "",
  });
  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const genderList = ["Male", "Female"];
  const [dependents, setDependents] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    console.log("Form submitted:", {});
  };

  function clearDetails() {
    setRecord({
      Name: "",
      Branch_Name: "",
      Birthday: "",
      ContactNumber: "",
      MaritalStatus: "",
      Status: "",
      PayGrade: "",
      Supervisor: "",
      Department: "",
      Gender: "",
    });
    setDependents([]);
    setAttributes([]);
    setErrorMessage("");
    setFormSubmitted(false);
  }

  useEffect(() => {
    const fetchStatusList = async () => {
      const response = await axios.get("http://localhost:5001/api/status");
      console.log(response.data);
      setStatusList(response.data.map((item) => item.Status_Type));
    };
    fetchStatusList();

    const fetchPayGradeList = async () => {
      const response = await axios.get("http://localhost:5001/api/payGrade");
      console.log(response.data);
      setpayGradeList(response.data.map((item) => item.Pay_Grade));
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

  useEffect(() => {
    if (formSubmitted) {
      axios
        .post("http://localhost:5001/api/employee/addEmployee", {
          Name: record.Name,
          Branch_Name: record.Branch_Name,
          Birthday: record.Birthday,
          ContactNumber: record.ContactNumber,
          MaritalStatus: record.MaritalStatus,
          Job_Title: "HR Manager",
          Status: record.Status,
          PayGrade: record.PayGrade,
          Supervisor: null,
          Department: record.Department,
          Gender: record.Gender,
          DependantsDetails: dependents,
          CustomAttributes: attributes,
        })

        .then((res) => {
          setErrorMessage(res.data.Message);
          console.log("Attributes", attributes);
          console.log(res.data);
        })
        .catch((error) => {
          console.log("Data not sent to server", error);
        });
    }
  }, [formSubmitted]);

  const dependancyStatus = [
    "Student",
    "Under graduate",
    "Post graduate",
    "Other",
  ];
  const relationship = ["Son", "Daughter"];
  const [value, setValue] = useState([]);

  const handleInputChange1 = (e, name, index) => {
    const { value } = e.target;
    const list = [...attributes];
    list[index][name] = value;
    setAttributes(list);
  };
  const deleteHandle1 = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };
  const AddCustomAttributes = () => {
    const attribute = {
      key: "",
      value: "",
    };
    setAttributes([...attributes, attribute]);
  };

  const handleAdd = () => {
    const dependant = {
      name: "",
      relationship: "",
      age: "",
      statusType: "",
    };
    setDependents([...dependents, dependant]);
  };
  const handleInputChange = (e, name, index) => {
    const { value } = e.target;
    const list = [...dependents];
    list[index][name] = value;
    setDependents(list);
  };
  const deleteHandle = (index) => {
    const updatedDependents = [...dependents];
    updatedDependents.splice(index, 1);
    setDependents(updatedDependents);
  };

  return (
    <div class="Instead_body_AE">
      <br />
      <div className="d-flex flex-column align-items-center">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Adding Personal Information
        </h1>
        <form onSubmit={handleSubmit} ref={formRef}>
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
            Branch Name:
            <select
              required
              value={record.Branch_Name}
              onChange={(e) =>
                setRecord({ ...record, Branch_Name: e.target.value })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">{record.Branch_Name}</option>
              {BranchList.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
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
                setRecord({ ...record, Birthday: e.target.value })
              }
              style={{ marginLeft: "10px" }}
            />
          </label>
          <br />

          <label className="mb-3">
            Contact Number:
            <input
              required
              type="tel"
              value={record.ContactNumber}
              onChange={(e) =>
                setRecord({ ...record, ContactNumber: e.target.value })
              }
              style={{ marginLeft: "10px", textAlign: "left" }}
            />
          </label>
          <br />

          <label className="mb-3">
            Gender:
            <select
              required
              value={record.Gender}
              onChange={(e) => setRecord({ ...record, Gender: e.target.value })}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select Gender</option>
              {genderList.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label className="mb-3">
            Department :
            <select
              required
              value={record.Department}
              onChange={(e) =>
                setRecord({ ...record, Department: e.target.value })
              }
              style={{ marginLeft: "10px", color: "black" }}
            >
              <option value="">Select a Department</option>
              {departmentList.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label className="mb-3">
            Marital Status:
            <select
              required
              value={record.MaritalStatus}
              onChange={(e) =>
                setRecord({ ...record, MaritalStatus: e.target.value })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select marital status</option>
              {maritalStatusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label className="mb-3">
            Status:
            <select
              required
              value={record.Status}
              onChange={(e) => setRecord({ ...record, Status: e.target.value })}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select Status</option>
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
              value={record.PayGrade}
              onChange={(e) =>
                setRecord({ ...record, PayGrade: e.target.value })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select Pay Grade</option>
              {payGradeList.map((payGrade, index) => (
                <option key={index} value={payGrade}>
                  {payGrade}
                </option>
              ))}
            </select>
          </label>
          <br />
          {attributes.map((attribute, idx) => {
            return (
              <div key={idx} style={{ marginTop: "20px" }}>
                <label>
                  Attribute:
                  <input
                    required
                    type="text"
                    value={attribute.key}
                    onChange={(e) => handleInputChange1(e, "key", idx)}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  />
                </label>
                <label>
                  Value:
                  <input
                    required
                    type="text"
                    value={attribute.value}
                    onChange={(e) => handleInputChange1(e, "value", idx)}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  />
                </label>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => deleteHandle1(idx)}
                  style={{
                    textAlign: "center",
                    lineHeight: 1,
                    fontSize: "12px",
                    width: "100px",
                    height: "30px",
                    backgroundColor: "orangered",
                    marginBottom: "10px",
                    marginTop: "10px",
                    marginLeft: "20px",
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <button
            onClick={() => AddCustomAttributes()}
            type="button"
            className="btn"
            style={{
              width: "250px",
              marginRight: "10px",
              marginTop: "20px",
            }}
          >
            Add Custom Attributes
          </button>

          <br />

          {dependents.map((dependant, idx) => {
            return (
              <div key={idx} style={{ marginTop: "20px", textAlign: "left" }}>
                <label>
                  Name:
                  <input
                    required
                    type="text"
                    value={dependant.name}
                    onChange={(e) => handleInputChange(e, "name", idx)}
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      textAlign: "left",
                    }}
                  />
                </label>
                <label styles={{ marginLeft: "10px", textAlign: "left" }}>
                  Relationship:
                  <select
                    value={dependant.relationship}
                    onChange={(e) => handleInputChange(e, "relationship", idx)}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    <option value="">Select a Relationship</option>
                    {relationship.map((relationship, index) => (
                      <option key={index} value={relationship}>
                        {relationship}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Age:
                  <input
                    required
                    type="text"
                    value={dependant.age}
                    onChange={(e) => handleInputChange(e, "age", idx)}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  />
                </label>
                <label>
                  Status:
                  <select
                    required
                    value={dependant.statusType}
                    onChange={(e) => handleInputChange(e, "statusType", idx)}
                    style={{ marginLeft: "10px" }}
                  >
                    <option value="">Select a Status</option>
                    {dependancyStatus.map((dependancyStatus, index) => (
                      <option key={index} value={dependancyStatus}>
                        {dependancyStatus}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  className="btn"
                  onClick={() => deleteHandle(idx)}
                  style={{
                    textAlign: "center",
                    lineHeight: 1,
                    fontSize: "12px",
                    width: "100px",
                    height: "30px",
                    backgroundColor: "orangered",
                    marginBottom: "10px",
                    marginTop: "10px",
                    marginLeft: "20px",
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <button
            onClick={() => handleAdd()}
            type="button"
            className="btn"
            style={{
              width: "250px",
              marginRight: "10px",
              marginTop: "20px",
            }}
          >
            Add Dependant Details
          </button>
          <br />
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>

          <button
            onClick={goBack}
            type="button"
            className="btn"
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
            disabled={formSubmitted}
            className="btn"
            type="submit"
            value="Submit"
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>

          <button
            onClick={clearDetails}
            type="button"
            className="btn"
            style={{
              color: "white",
              fontSize: "16px",
              marginLeft: "50px",
              marginTop: "20px",
            }}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHRManager;
