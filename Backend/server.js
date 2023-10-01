const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
var token;
var employeeId;
const app = express();

app.use(cors());
app.use(express.json());
const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "jupiter",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});
//post relavent employees ID
app.post("/api/send-employee-id", (req, res) => {
  employeeId = req.body.Employee_ID;
  console.log(employeeId);
  res.send(employeeId);
});

//get relavent employee Informations
app.get("/api/employeeInfo/employee", (req, res) => {
  db.query(
    `SELECT e.Employee_ID, o.Organization_Name, e.Name,e.Birthdate,e.Marital_status,e.Emergency_contact_Number, es.Status_Type, ej.Job_Title, s.Name as Supervisor_Name FROM employee e natural join organization o natural join employee_status es natural join employee_job_title ej  left join employee s on e.Supervisor_ID = s.Employee_ID  where e.Employee_ID = ?`,
    [employeeId],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//Get all employee informations
app.get("/api/employeeInfo", (req, res) => {
  db.query("SELECT Employee_ID, Name FROM employee ", (err, rows, fields) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});
//get Added employee details
app.post("/api/employee/addEmployee", (req, res) => {
  db.query(
    "INSERT INTO employee (Employee_ID, Organization_Registration_Number, Name, Birthdate, Emergency_contact_Number, Marital_status, Supervisor_ID, Status_ID, Job_Title_ID, Pay_Grade_ID) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.employeeId,
      req.body.organizationId,
      req.body.name,
      req.body.birthday,
      req.body.contactNumber,
      req.body.maritalStatus,
      req.body.supervisorId,
      req.body.statusID,
      req.body.jobTitleId,
      req.body.payGradeId,
    ],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
  db.query(
    "Insert into user_account (Employee_ID, Password) values (?,?)",
    [req.body.employeeId, req.body.employeeId + "@123"],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//Get the token from the frontend and send it to the backend
app.post("/api/send-variable", (req, res) => {
  token = req.body.username;
  console.log(token);
  res.send(token);
});

//View personal Information
app.get("/api/personalInfo", (req, res) => {
  db.query(
    `SELECT e.Employee_ID, o.Organization_Name, e.Name,e.Birthdate,e.Marital_status,e.Emergency_contact_Number, es.Status_Type, ej.Job_Title, s.Name as Supervisor_Name FROM employee e natural join organization o natural join employee_status es natural join employee_job_title ej  left join employee s on e.Supervisor_ID = s.Employee_ID  where e.Employee_ID = ?`,
    [token],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//User Login

app.get("/api/userLogin", (req, res) => {
  db.query(
    "SELECT Employee_ID, Password,Job_Title_ID FROM user_account natural join employee ",
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
