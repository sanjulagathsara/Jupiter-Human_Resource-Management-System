import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const AddEmployee = () => {
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
  const formRef = useRef(null);
  const [BranchList, setBranchList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [jobTitleList, setjobTitleList] = useState([]);
  const [payGradeList, setpayGradeList] = useState([]);
  const [record, setRecord] = useState([]);
  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const [supervisorList, setSupervisorList] = useState([]);
  const [statusType, setStatusType] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const genderList = ["Male", "Female"];

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    alert("Form submitted");
    formRef.current.reset();
    console.log("Form submitted:", {});
  };

  function clearDetails() {
    setRecord({
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
  }

  useEffect(() => {
    const fetchJobTitleList = async () => {
      const response = await axios.get("http://localhost:5001/api/jobTitle");
      console.log(response.data);
      setjobTitleList(response.data.map((item) => item.Job_Title));
    };
    fetchJobTitleList();

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
          Job_Title: record.Job_Title,
          Status: record.Status,
          PayGrade: record.PayGrade,
          Supervisor: record.Supervisor,
          Department: record.Department,
          Gender: record.Gender,
        })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          console.log("Data sent to server");
        })
        .catch((error) => {
          console.log("Data not sent to serve");
        });
      clearDetails();
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  useEffect(() => {
    const SupervisorList = async () => {
      const response = await axios.post(
        "http://localhost:5001/api/supervisorList",
        { jobTitle: jobTitle }
      );
      console.log(response.data);
      setSupervisorList(response.data.map((item) => item.Name));
    };
    SupervisorList();
  }, [jobTitle]);

  const dependancyStatus = [
    "Student",
    "Under graduate",
    "Post graduate",
    "Other",
  ];
  const relationship = ["Son", "Daughter"];
  const [value, setValue] = useState([]);

  const handleAdd = () => {
    const dependant = {
      name: "",
      relationship: "",
      birthday: "",
      statusType: "",
    };
    setValue([...value, dependant]);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...value];
    list[index][name] = value;
    setValue(list);
  };
  const deleteHandle = (index) => {
    const list = [...value];
    list.splice(index, 1);
    setValue(list);
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Personal Informations
        </h1>
        <form onSubmit={handleSubmit} ref={formRef}>
          <label className="mb-3">
            Name:
            <input
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
              type="tel"
              value={record.ContactNumber}
              onChange={(e) =>
                setRecord({ ...record, ContactNumber: e.target.value })
              }
              style={{ marginLeft: "10px" }}
            />
          </label>
          <br />

          <label className="mb-3">
            Gender:
            <select
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
              value={record.Department}
              onChange={(e) =>
                setRecord({ ...record, Department: e.target.value })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select a supervisor</option>
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
            Job Title:
            <select
              value={record.Job_Title}
              onChange={(e) => {
                setRecord({ ...record, Job_Title: e.target.value });
                setJobTitle(e.target.value);
              }}
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
          <br />
          <label className="mb-3">
            Status:
            <select
              value={record.Status}
              onChange={(e) => setRecord({ ...record, Status: e.target.value })}
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
          <br />
          <label className="mb-3">
            Pay Grade:
            <select
              value={record.PayGrade}
              onChange={(e) =>
                setRecord({ ...record, PayGrade: e.target.value })
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
          <br />

          <label className="mb-3">
            Supervisor :
            <select
              value={record.Supervisor}
              onChange={(e) =>
                setRecord({ ...record, Supervisor: e.target.value })
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select a supervisor</option>
              {supervisorList.map((supervisor, index) => (
                <option key={index} value={supervisor}>
                  {supervisor}
                </option>
              ))}
            </select>
          </label>
          <br />

          <button
            onClick={() => handleAdd()}
            type="button"
            className="btn btn-primary"
            style={{
              color: "white",
              fontSize: "16px",
              marginRight: "50px",
              marginTop: "20px",
            }}
          >
            Add Dependants Details
          </button>
          {value.map((val, idx) => {
            return (
              <div key={idx} style={{ marginTop: "20px" }}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={val.name}
                    onChange={(e) => handleInputChange(e, idx)}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  />
                </label>
                <label styles={{ marginLeft: "10px" }}>
                  Relationship:
                  <select
                    value={relationship}
                    onChange={(e) => handleInputChange(e, idx)}
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
                    type="text"
                    value={val.birthday}
                    onChange={(e) => handleInputChange(e, idx)}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  />
                </label>
                <label>
                  Status:
                  <select
                    value={statusType}
                    onChange={(e) => handleInputChange(e, idx)}
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
                  className="btn btn-primary"
                  onClick={() => deleteHandle()}
                  style={{
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

          <button
            onClick={clearDetails}
            type="button"
            className="btn btn-primary"
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

export default AddEmployee;
