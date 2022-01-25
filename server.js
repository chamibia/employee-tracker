//dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  //my MySQL username,
  user: "root",
  //MY MySQL password
  password: "password",
  database: "employees",
});

// Start server after db connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  startPrompt();
});

//Initial Prompt
startPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View all departments?",
          "View all roles?",
          "View all employees?",
          "Would you like to add a department?",
          "Add role?",
          "Add an employee?",
          "Update an employee role?",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      let userChoice = answer.choice;
      console.log(userChoice);
      switch (userChoice) {
        case "View all departments?":
          viewAllDepartments();
          break;

        case "View all roles?":
          viewAllRoles();
          break;

        case "View all employees?":
          viewAllEmployees();
          break;

        case "Would you like to add a department?":
          addDepartment();
          break;

        case "Add role?":
          addRole();
          break;

        case "Add an employee?":
          addEmployee();
          break;

        case "Update an employee role?":
          updateRole();
          break;
      }
    });
};

//functions to create prompts

//View all employees
function viewAllEmployees() {
  db.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

// View all roles function
function viewAllRoles() {
  db.query("SELECT * FROM roles;", (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

//View all departments
function viewAllDepartments() {
  db.query("SELECT * FROM departments;", (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

// // Add role function
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "what is the roles title?",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID for this role",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO roles SET ?",
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

// // Add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is the employess ID number?",
      },
      {
        type: "input",
        name: "manager",
        message: "What is the employees manager ID number?",
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.role,
          manager_id: res.manager,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

// Add new department

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "depoName",
        message: "Please enter the name of the department",
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO departments SET ?",
        {
          department_name: res.depoName,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

// Update an employee role function
function updateRole() {
  db.query("SELECT * FROM employee ORDER BY first_name", (err, res) => {
    let employee = res.map((employee) => {
      console.log(res);
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });
    db.query("SELECT * FROM roles ORDER BY title", (err, res) => {
      let roles = res.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "updateEmployee",
            message: " Please enter employees name.",
            choices: employee,
          },
          {
            type: "list",
            name: "updateRole",
            message: "Please enter the employees new role.",
            choices: roles,
          },
        ])
        .then((res) => {
          db.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [res.updateRole, res.updateEmployee],
            function (err) {
              if (err) throw err;
              console.table(res);
              startPrompt();
            }
          );
        });
    });
  });
}
