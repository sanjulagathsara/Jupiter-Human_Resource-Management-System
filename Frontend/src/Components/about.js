import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div class="about">
      <br />
      <br />
      <p className="jupiter">
        <b>Jupiter</b>
      </p>
      <h2>
        <b>Human Resource Management System</b>
      </h2>
      <br />
      <br />
      <p>
        <b>Created By</b>
      </p>
      <p>
        <b>Group 9 - Batch 21</b>
      </p>
      <p>Department of Computer Science & Engineering</p>
      <p>University of Moratuwa</p>
      <p>----------- </p>
      <div class="participants">
        <p>210180L - SANJULA GATHSARA</p>
        <p>210196P - SAHAN GUNATHUNGA</p>
        <p>210201F - SITHIKA GURUGE</p>
        <p>210277P - DILRANGI SANKALPANA</p>
        <p>210396E - SHASHINI MUNASINGHE</p>
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
      </div>
    </div>
  );
};

export default About;
