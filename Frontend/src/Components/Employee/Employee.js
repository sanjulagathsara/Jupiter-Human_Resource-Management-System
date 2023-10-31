import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Employee.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Employee = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  //post user name and password to the backend and check whether it is correct
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid) {
          navigate(`/login/Employee:${response.data.role}`);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        username: username,
        password: password,
      });

      console.log(response.data.status);
      setErrorMessage(response.data.message);
      if (response.data.status === "success") {
        navigate("/login/home");
      }
    } catch (err) {
      console.error(err.status);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    fetchdata();
  }

  return (
    <div className="welcome">
      <div className="bg-white p-3 rounded w-25" style={{marginTop : "250px"}}>
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <div className="mb-3">
            <label htmlFor="username"><b>Username</b></label>{" "}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              className="form-control rounded-0"
              style={{ width: '328px' }}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password"><b>Password</b></label>{" "}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="form-control rounded-0"
              style={{ width: '328px' }}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <p className="text-danger">{errorMessage}</p>
          </div>

          <button className="btn btn-success w-100 rounded-0"><b>Login</b></button>
        </form>
      </div>
    </div>
  );
};

export default Employee;
