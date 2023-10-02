import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Employee.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Employee = () => {
  const navigate = useNavigate();
  var foundElement;
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/userLogin")
      .then((response) => response.json())
      .then((data) => {
        setRecord(data);
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  function check(username, password) {
    foundElement = record.find((element) => {
      return element.Employee_ID === username && element.Password === password;
    });

    return foundElement;
  }

  function sendToken() {
    fetch("http://localhost:5000/api/send-variable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: foundElement.Employee_ID }),
    })
      .then((data) => {
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (check(username, password)) {
      sendToken();
      navigate(`/login/Employee:${foundElement.Job_Title_ID}`);
    } else {
      alert("Login Failed");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center gradient-bg bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">Username</label>{" "}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              className="form-control rounded-0"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>{" "}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="form-control rounded-0"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Employee;
