CREATE DATABASE jupiter;
USE jupiter;

CREATE TABLE Employee_Job_Title(
  Job_Title_ID  varchar(5),
  Job_Title varchar(25),
  PRIMARY KEY (Job_Title_ID)
);

CREATE TABLE Employee_Status(
  Status_ID varchar(5),
  Status_Type varchar(20),
  PRIMARY KEY (Status_ID)
);

CREATE TABLE Organization(
  Organization_Registration_Number varchar(5),
  Organization_Name varchar(10),
  Address varchar(100),
  PRIMARY KEY (Organization_Registration_Number)
);

CREATE TABLE Employee_Pay_Grade(
  Pay_Grade_ID varchar(5),
  Pay_Grade varchar(20),
  No_pay_Leave_Count int,
  Annual_Leave_Count int,
  Casual_Leave_Count int,
  Maternity_Leave_Count int,
  PRIMARY KEY (Pay_Grade_ID)
);

CREATE TABLE Employee (
  Employee_ID varchar(5),
  Organization_Registration_Number varchar(5),
  Name varchar(20),
  Birthdate date,
  Marital_status enum('Married','Un-Married','Divorced','Widowed'),
  Emergency_contact_Number varchar(15),
  Supervisor_ID varchar(5),
  Status_ID varchar(5),
  Job_Title_ID varchar(5),
  Pay_Grade_ID varchar(5),
  PRIMARY KEY (Employee_ID),
  FOREIGN KEY (Job_Title_ID) REFERENCES Employee_Job_Title(Job_Title_ID),
  FOREIGN KEY (Status_ID) REFERENCES Employee_Status(Status_ID),
  FOREIGN KEY (Organization_Registration_Number) REFERENCES Organization(Organization_Registration_Number),
  FOREIGN KEY (Pay_Grade_ID) REFERENCES Employee_Pay_Grade(Pay_Grade_ID)
);

CREATE TABLE Employee_Leave_Details (
  Employee_ID varchar(5),
  Remaining_Maternity_Leave_Count int,
  Remaining_No_pay_Leave_Count int,
  Remaining_Annual_Leave_Count int,
  Remaining_Casual_Leave_Count int,
  PRIMARY KEY (Employee_ID),
  FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);


CREATE TABLE Leave_Application (
  Leave_Application_No int,
  Employee_ID varchar(5),
  LeaveType enum('Annual','Casual','Maternity','No-pay'),
  Approval_status boolean,
  PRIMARY KEY (Leave_Application_No),
  FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE user_account (
  Employee_ID varchar(5) NOT NULL,
  Password varchar(25) DEFAULT NULL,
  PRIMARY KEY (Employee_ID),
  CONSTRAINT user_account_ibfk_1 FOREIGN KEY (Employee_ID) REFERENCES employee (Employee_ID)
);





INSERT INTO Employee_Job_Title (Job_Title_ID, Job_Title)
VALUES
  ('JT001', 'HR_Manager'),
  ('JT002', 'Supervisor'),
  ('JT003', 'Accountant'),
  ('JT004', 'Software_Engineer'),
  ('JT005', 'QA_Engineer')
  ;

-- Sample data for Employee_Status table
INSERT INTO Employee_Status (Status_ID, Status_Type)
VALUES
  ('S001', 'Intern-fulltime'),
  ('S002', 'Intern-Parttime'),
  ('S003', 'Contract-fultime'),
  ('S004', 'Contract-parttime'),
  ('S005', 'Permanent'),
  ('S006', 'Freelance');

-- Sample data for Organization table
INSERT INTO Organization (Organization_Registration_Number, Organization_Name, Address)
VALUES
  ('OR001', 'Jupiter', '123 Main Street,Colombo,Sri Lanka'),
  ('OR002', 'XYZ Ltd', '456 ,Daka, Bangaladesh'),
  ('OR003', 'PQR Inc', '789, Islamabad,Pakistan');

-- Sample data for Employee_Pay_Grade table
INSERT INTO Employee_Pay_Grade (Pay_Grade_ID, Pay_Grade, No_pay_Leave_Count, Annual_Leave_Count, Casual_Leave_Count, Maternity_Leave_Count)
VALUES
  ('PG001', 'Level 1', 50, 10, 8, 15),
  ('PG002', 'Level 2', 50, 19, 8, 14),
  ('PG003', 'Level 3', 50, 15, 6, 10);

-- Sample data for Employee table
INSERT INTO Employee (Employee_ID, Organization_Registration_Number, Name, Birthdate, Marital_status, Emergency_contact_Number, Supervisor_ID, Status_ID, Job_Title_ID, Pay_Grade_ID)
VALUES
  ('E001', 'OR001', 'Kavindu Prabath', '1990-05-15', 'Married', '077-1231234', Null, 'S005', 'JT001', 'PG001'),
  ('E002', 'OR001', 'Kasun Shyamal', '1985-08-22', 'Un-Married', '0713455432', 'E001', 'S003', 'JT002', 'PG002'),
  ('E003', 'OR002', 'Yasantha Jayalath', '1992-11-10', 'Divorced', '0723455432', NULL, 'S005', 'JT004', 'PG001'),
  ('E004', 'OR003', 'Nuwan Dinujaya', '1988-03-30', 'Married', '0776545654', 'E003', 'S002', 'JT003', 'PG002');

-- Sample data for Employee_Leave_Details table
INSERT INTO Employee_Leave_Details (Employee_ID,  Remaining_No_pay_Leave_Count, Remaining_Annual_Leave_Count, Remaining_Casual_Leave_Count,Remaining_Maternity_Leave_Count)
VALUES
  ('E001', 45, 5, 8, 15),
  ('E002', 12, 13, 6, 5),
  ('E003', 38, 3, 8, 9),
  ('E004', 15, 10, 5, 7);



-- Sample data for Leave_Application table
INSERT INTO Leave_Application (Leave_Application_No, Employee_ID, LeaveType)
VALUES
  (101, 'E001', 'Annual'),
  (102, 'E002', 'Casual'),
  (103, 'E003', 'Maternity');
  
  
-- Sample data for User Account Table

INSERT INTO user_account (Employee_ID, Password)
VALUES
  ('E001', 'Kavindu@Jupiter'),
  ('E002', 'Kasun@Jupiter')
  ;
  
  