import React from "react";
const EditEmployee = () => {
<<<<<<< Updated upstream
=======
  const [jobTitleList, setJobTitleList] = useState([]);
  const [payGradeList, setPayGradeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const supervisors = ["Kavindu Dasun", "Yasantha Jayalath"];
  const navigate = useNavigate();
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
  }, []);

  //get informations of relavent employee
  const [record, setRecord] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/employeeInfo/employee"
        );
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
                employeeId: record.Employee_ID,
                name: record.Name,
                birthday: record.Birthdate,
                contactNumber: record.Emergency_contact_Number,
                maritalStatus: record.Marital_status,
                supervisorId: record.Supervisor_Name,
                status: record.Status_Type,
                jobTitle: record.Job_Title,
                payGrade: record.Pay_Grade,
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

>>>>>>> Stashed changes
  return (
    <div>
      <h1>Edit Employee</h1>
    </div>
  );
};

export default EditEmployee;
