const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
var employeeId;
const app = express();
var personalID;
const session = require("express-session");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 60 },
  })
);

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

//get job title list
app.get("/api/jobTitle", (req, res) => {
  db.query("SELECT Job_Title FROM employee_job_title", (err, rows, fields) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

//get pay grade list
app.get("/api/payGrade", (req, res) => {
  db.query("SELECT Pay_Grade FROM employee_pay_grade", (err, rows, fields) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

//get status list
app.get("/api/status", (req, res) => {
  db.query("SELECT Status_Type FROM employee_status", (err, rows, fields) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

//post details of leaveRequest
app.post("/api/leaveRequest", (req, res) => {
  console.log("Leave details received from frontend");
  console.log(req.body);
});

//get leave Types
app.get("/api/leaveTypes", (req, res) => {
  db.query("SELECT LeaveType FROM leave_application", (err, rows) => {
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

//get employee leave details
app.get("/api/leaveDetails", (req, res) => {
  db.query(
    "SELECT * FROM employee_leave_details where Employee_ID = ?",
    [personalID],
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

//post edited data
app.post("/api/ManUI/EditPI/edited", (req, res) => {
  console.log("Edited data fetch from server:");
  console.log(req.body);

  db.query(
    "select Job_Title_ID from employee_job_title where Job_Title = ?",
    [req.body.jobTitle],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        db.query("Update employee SET Job_Title_ID = ? where Employee_ID = ?", [
          rows[0].Job_Title_ID,
          req.body.employeeId,
        ]);
      }
    }
  );

  db.query(
    "select Status_ID from employee_status where Status_Type = ?",
    [req.body.status],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        db.query("Update employee SET Status_ID = ? where Employee_ID = ?", [
          rows[0].Status_ID,
          req.body.employeeId,
        ]);
      }
    }
  );

  db.query(
    "select Pay_Grade_ID from employee_pay_grade where Pay_Grade = ?",
    [req.body.payGrade],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        db.query("update employee SET Pay_Grade_ID = ? where Employee_ID = ?", [
          rows[0].Pay_Grade_ID,
          req.body.employeeId,
        ]);
      }
    }
  );

  db.query(
    "select Employee_ID from employee where Name = ?",
    [req.body.supervisorId],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        db.query(
          "update employee SET Supervisor_ID = ? where Employee_ID = ?",
          [rows[0].Employee_ID, req.body.employeeId]
        );
      }
    }
  );

  db.query(
    "UPDATE employee SET Name = ? , Emergency_contact_Number = ? , Marital_status = ?    WHERE Employee_ID = ?",
    [
      req.body.name,
      req.body.contactNumber,
      req.body.maritalStatus,

      req.body.employeeId,
    ],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log("Edited data fetch from server:", {});

        res.json(rows);
      }
    }
  );
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
    `SELECT e.Employee_ID, p.Pay_Grade, e.Name,e.Birthdate,e.Marital_status,e.Emergency_contact_Number, es.Status_Type, ej.Job_Title, s.Name as Supervisor_Name FROM employee e natural join employee_pay_grade p natural join employee_status es natural join employee_job_title ej  left join employee s on e.Supervisor_ID = s.Employee_ID  where e.Employee_ID = ?`,
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
  db.query(
    "SELECT Employee_ID, Name FROM employee where Employee_ID != ?",
    [personalID],
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

//View personal Information
app.get("/api/personalInfo", (req, res) => {
  db.query(
    `SELECT e.Employee_ID, p.Pay_Grade, e.Name,e.Birthdate,e.Marital_status,e.Emergency_contact_Number, es.Status_Type, ej.Job_Title,ej.Job_Title_ID, s.Name as Supervisor_Name, py.Pay_Grade as Pay_Grade  FROM employee e natural join employee_pay_grade py natural join employee_pay_grade p natural join employee_status es natural join employee_job_title ej  left join employee s on e.Supervisor_ID = s.Employee_ID  where e.Employee_ID = ?`,
    [personalID],
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

//Token verify
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token:", token);

  if (token) {
    jwt.verify(token, "Seceret key token", (err, decodedToken) => {
      if (err) {
        console.log("Authentication error", err.message);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    console.log("Login token failed");
  }
};

app.get("/", verifyUser, (req, res) => {
  db.query(
    "select Job_Title_ID from employee where Employee_ID = ?",
    [personalID],
    (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        if (rows.length > 0) {
          res.json({ message: "Success", job: rows[0].Job_Title_ID });
        } else {
          res.json({ message: "unsuccess", job: null });
        }
      }
    }
  );
});

//User Login

app.post("/api/login", (req, res) => {
  db.query(
    "SELECT Employee_ID,Job_Title_ID FROM user_account natural join employee WHERE Employee_ID = ? AND Password = ?",
    [req.body.username, req.body.password],
    (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        if (rows.length > 0) {
          const id = req.body.username;
          personalID = id;
          const token = jwt.sign({ id }, "Seceret key token", {
            expiresIn: "1d",
          });
          req.session.role = rows[0].Job_Title_ID;
          res.cookie("token", token);
          res.json({
            status: "success",
            body: rows,
          });
        } else {
          res.json({
            status: "failed",
          });
          console.log("Login failed");
        }
      }
    }
  );
});
//clear cookies
app.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout success" });
  req.session.destroy();
});

//check session
app.get("/api/check", (req, res) => {
  if (req.session.role) {
    return res.json({
      valid: true,
      role: req.session.role,
    });
  } else {
    return res.json({
      valid: false,
    });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
