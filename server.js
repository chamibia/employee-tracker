//dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  //my MySQL username,
  user: "root",
  //MY MySQL password
  password: "password",
  database: "employee_trackerDB",
});

// Start server after db connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  startPrompt();
});

//Initial Prompt
function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View all Employees?",
          "View all Employees by Roles?",
          "View all Employees by Departments?",
          "Update Employee?",
          "Add Employee?",
          "Add role?",
          "Add department?",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "View all Employees?":
          viewAllEmployees();
          break;

        case "View all Employyes by Roles?":
          viewAllRoles();
          break;

        case "View all Employees by Departments?":
          viewAllDepartments();
          break;

        case "Update Employee?":
          updateEmployee();
          break;

        case "Add Employee?":
          addEmployee();
          break;

        case "Add role?":
          addRole();
          break;

        case "Add department?":
          addDepartment();
          break;
      }
    });
}

//functions to call prompts
//View all employees
function viewAllEmployees() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee employee LEFT JOIN employee m ON employee.manager_id = m.id INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id ORDER BY ID ASC";
  );
}

//View all roles

//View all employees by departments

//Add Employee

//Update Employee

//Add Employee Role

//Add Department
SELECT department_id AS id, 
                  department.name AS department,
                  SUM(salary) AS budget
                  FROM  roles  
                  INNER JOIN department ON roles.department_id = department.id 
                  inner join employee on employee.role_id = roles.id
                  where department.id = "1";
