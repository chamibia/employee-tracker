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
