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
          "Add department?",
          "Add role?",
          "Add an employee?",
          "Update an employee role?",
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

        case "Add department":
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

//functions to call prompts
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

// Add department function
function viewAllDepartments() {
  db.query("SELECT * FROM departments;", (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

// Add role function
function addRole() {
  db.query(
    "SELECT roles.title AS Title, roles.id AS Id, roles.department AS Department, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "what is the roles title?",
          },
          {
            type: "input",
            name: "department",
            message: "In which department is this role?",
          },
          {
            type: "input",
            name: "managerId",
            message: "Enter their managers id",
          },
        ])
        .then(function (res) {
          db.query(
            "INSERT INTO roles SET?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              startPrompt();
            }
          );
        });
    }
  );
}

// Add an employee function
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
        name: "manager",
        message: "Who is the employees manager?",
        choices: addManager(),
      },
    ])
    .then(function (userChoice) {
      const rolesId = viewAllRoles().indexOf(userChoice.roles) + 1;
      const ManagerId = selectManager().indexOf(userChoice) + 1;
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: userChoice.firstName,
          last_name: userChoice.last,
          manager_id: ManagerId,
          role_id: rolesId,
        },
        function (err) {
          if (err) throw err;
          console.table(userChoice);
          startPrompt();
        }
      );
    });
}

// Update an employee role function

// Update an employee role function

//Add Department
// (SELECT department_id AS id, department.name AS department, SUM(salary) AS budget FROM  roles INNER JOIN department ON roles.department_id = department.id inner join employee on employee.role_id = roles.id where department.id = "1");

// "SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.name AS department, roles.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee employee LEFT JOIN employee m ON employee.manager_id = m.id INNER JOIN roles ON employee.role_id = roles.id INNER JOIN departments ON roles.departments_id = departments.id ORDER BY ID ASC"
