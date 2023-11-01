import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RepByCusFields.css";
import { useNavigate } from "react-router-dom";
function RepByCusField() {
  const navigate = useNavigate();
  const [customAttributes, setCustomAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchCustomAttributes();
  }, []);

  const fetchCustomAttributes = () => {
    axios
      .get("http://localhost:5001/customfields")
      .then((response) => {
        if (response.data) {
          const attributes = response.data.map((row) => row.attribute);
          setCustomAttributes(attributes);
        } else {
          setError("No custom attributes found.");
        }
      })
      .catch((error) => {
        setError("Error fetching custom attributes: " + error.message);
      });
  };

  const handleAttributeSelect = (event) => {
    setSelectedAttribute(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAttribute) {
      axios
        .get("http://localhost:5001/reportsbycustomfields", {
          params: { attribute: selectedAttribute },
        })
        .then((response) => {
          if (response.data) {
            setReportData(response.data);
          } else {
            setReportData([]);
          }
        })
        .catch((error) => {
          setError("Error fetching report data: " + error.message);
        });
    }
  };

  return (
    <div className="centered-container">
      <h1 className="main-title">Employees by Custom Attributes</h1>
      <div className="employee-form">
        <label htmlFor="attribute" className="label">
          Select Custom Attribute:
        </label>
        <select
          id="attribute"
          value={selectedAttribute}
          onChange={handleAttributeSelect}
          className="select-box"
        >
          <option value="">Select a custom attribute</option>
          {customAttributes.map((attribute, index) => (
            <option key={index} value={attribute}>
              {attribute}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit} className="button-style">
          Submit
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {reportData.length > 0 && (
        <div className="report-data">
          <h2>Report Data for {selectedAttribute}:</h2>
          <ul className="result-list">
            {reportData.map((data, index) => (
              <li key={index} className="result-item">
                <div className="employee-id">
                  Employee ID: {data.Employee_ID}
                </div>
                <div className="attribute">Attribute: {data.Attribute}</div>
                <div className="value">Value: {data.value}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="btn" onClick={goBack}>
        Go Back
      </button>
    </div>
  );
}

export default RepByCusField;
