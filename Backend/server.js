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
const argon2 = require("argon2");
const dotenv = require("dotenv");
dotenv.config();

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
const port = 5001;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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
  db.query(
    "SELECT Job_Title FROM employee_job_title where Job_Title_ID != 'JT001' and Job_Title_ID != 'JT002' ",
    (err, rows, fields) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//get Branches
app.get("/api/branch", (req, res) => {
  db.query("SELECT Branch_Name FROM branch", (err, rows) => {
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

//get department

app.get("/api/department", (req, res) => {
  db.query("SELECT Department_Name FROM department", (err, rows) => {
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
  db.query(
    "INSERT INTO leave_application(Employee_ID, LeaveType, Start_Date, End_Date, Approval_status) VALUES (?,?,?,?,?)",
    [
      personalID,
      req.body.LeaveType,
      req.body.StartDate,
      req.body.EndDate,
      "Pending",
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
});

//get leave Types
app.get("/api/leaveTypes", (req, res) => {
  rows = ["Annual", "Casual", "Maternity", "No-pay"];
  res.json(rows);
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

  // db.query(
  //   "select Job_Title_ID from employee_job_title where Job_Title = ?",
  //   [req.body.jobTitle],
  //   (err, rows) => {
  //     if (err) {
  //       console.error("Error querying MySQL:", err);
  //       res.status(500).json({ error: "Internal server error" });
  //       return;
  //     } else {
  //       db.query("Update employee SET Job_Title_ID = ? where Employee_ID = ?", [
  //         rows[0].Job_Title_ID,
  //         req.body.employeeId,
  //       ]);
  //     }
  //   }
  // );

  // db.query(
  //   "select Status_ID from employee_status where Status_Type = ?",
  //   [req.body.status],
  //   (err, rows) => {
  //     if (err) {
  //       console.error("Error querying MySQL:", err);
  //       res.status(500).json({ error: "Internal server error" });
  //       return;
  //     } else {
  //       db.query("Update employee SET Status_ID = ? where Employee_ID = ?", [
  //         rows[0].Status_ID,
  //         req.body.employeeId,
  //       ]);
  //     }
  //   }
  // );

  // db.query(
  //   "select Pay_Grade_ID from employee_pay_grade where Pay_Grade = ?",
  //   [req.body.payGrade],
  //   (err, rows) => {
  //     if (err) {
  //       console.error("Error querying MySQL:", err);
  //       res.status(500).json({ error: "Internal server error" });
  //       return;
  //     } else {
  //       db.query("update employee SET Pay_Grade_ID = ? where Employee_ID = ?", [
  //         rows[0].Pay_Grade_ID,
  //         req.body.employeeId,
  //       ]);
  //     }
  //   }
  // );

  // db.query(
  //   "select Employee_ID from employee where Name = ?",
  //   [req.body.supervisorId],
  //   (err, rows) => {
  //     if (err) {
  //       console.error("Error querying MySQL:", err);
  //       res.status(500).json({ error: "Internal server error" });
  //       return;
  //     } else {
  //       db.query(
  //         "update employee SET Supervisor_ID = ? where Employee_ID = ?",
  //         [rows[0].Employee_ID, req.body.employeeId]
  //       );
  //     }
  //   }
  // );

  db.query(
    "CALL UpdateEmployee(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.EmployeeID,
      req.body.Name,
      req.body.Birthday,
      req.body.ContactNumber,
      req.body.MaritalStatus,
      req.body.Branch_Name,
      req.body.Status,
      req.body.Job_Title,
      req.body.PayGrade,
      req.body.Supervisor,
      req.body.Department,
      req.body.Gender,
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
    "select * from getpersonalinfo where Employee_ID = ?",
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
    "SELECT Employee_ID, Name FROM employee where Employee_ID != ? ",
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

//Post employee details
app.post("/api/employee/addEmployee", (req, res) => {
  const sql2 = "SELECT getLastEmployeeID() AS lastEmployeeID";

  db.query(sql2, (err, rows) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const lastEmployeeID = rows[0].lastEmployeeID;

    // Use lastEmployeeID inside this scope
    argon2.hash(`${lastEmployeeID}@Jupiter`).then((hash) => {
      console.log("Password", `${lastEmployeeID}@Jupiter`);
      const sql = "CALL AddEmployeeAndUserAccount(?,?,?,?,?,?,?,?,?,?,?)";

      db.query(
        sql,
        [
          req.body.Name,
          req.body.Birthday,
          req.body.ContactNumber,
          req.body.MaritalStatus,
          req.body.Name,
          hash,
          req.body.Branch_Name,
          req.body.Status,
          req.body.Job_Title,
          req.body.PayGrade,
          req.body.Supervisor,
        ],
        (err, rows) => {
          if (err) {
            console.error("Error querying MySQL:", err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            console.log(rows);
            res.json(rows);
          }
        }
      );
    });
  });
});

//get supervisor relevent to job title
app.post("/api/supervisorList", (req, res) => {
  console.log(req.body.jobTitle);
  var jobTitle = req.body.jobTitle;
  switch (jobTitle) {
    case "Senior Software Engineer":
    case "Senior QA Engineer":
    case "Senior Accountant":
    case "Senior HR Executive":
    case "Administrative Officer":
      jobTitle = "JT009";
      break;
    case "Software Engineer":
      jobTitle = "JT003";
      break;
    case "QA Engineer":
      jobTitle = "JT004";
      break;
    case "Accountant":
      jobTitle = "JT005";
      break;

    default:
      break;
  }
  db.query(
    "SELECT Name FROM employee where Job_Title_ID = ? and Employee_ID != ?",
    [jobTitle, employeeId],
    (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err);
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
    "select * from getpersonalinfo where Employee_ID = ?",
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
// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   console.log("Token:", token);

//   if (token) {
//     jwt.verify(token, "Seceret key token", (err, decodedToken) => {
//       if (err) {
//         console.log("Authentication error", err.message);
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     console.log("Login token failed");
//   }
// };

// app.get("/", verifyUser, (req, res) => {
//   db.query(
//     "select Job_Title_ID from employee where Employee_ID = ?",
//     [personalID],
//     (err, rows) => {
//       if (err) {
//         console.error("Error fetching data:", err);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       } else {
//         console.log(rows);
//         if (rows.length > 0) {
//           res.json({ message: "Success", job: rows[0].Job_Title_ID });
//         } else {
//           res.json({ message: "unsuccess", job: null });
//         }
//       }
//     }
//   );
// });

// app.get("/api/login1", (req, res) => {
//   argon2.hash("E016").then((hash) => {
//     console.log("Password", hash);
//   });
// });

//User Login

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM loginWithJobTitle WHERE user_name = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      console.log("Invalid Password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const hashedPassword = results[0].password;
    argon2.verify(hashedPassword, password).then((match) => {
      if (match) {
        console.log("Password matched!");
        personalID = results[0].Employee_ID;
        req.session.role = results[0].Job_Title_ID;

        res.json({
          status: "success",
        });
        console.log("Login successfull");
      } else {
        console.log("Password did not match!");
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    });

    // db.query(
    //   "SELECT Employee_ID,Job_Title_ID FROM user_account natural join employee WHERE Employee_ID = ? AND Password = ?",
    //   [req.body.username, req.body.password],

    //   (err, rows) => {
    //     if (err) {
    //       console.error("Error fetching data:", err);
    //       res.status(500).json({ error: "Internal server error" });
    //       return;
    //     } else {
    //       if (rows.length > 0) {
    //         const id = req.body.username;
    //         personalID = id;
    //         // const token = jwt.sign({ id }, "Seceret key token", {
    //         //   expiresIn: "1d",
    //         // });

    //       } else {
    //         res.json({
    //           status: "failed",
    //         });
    //         console.log("Login failed");
    //       }
    //     }
    //   }
    // );
  });
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
  console.log("Server is running on port5001");
});
