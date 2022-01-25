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

//Select Role title for Add employee prompt
// let roleArr = [];
// function selectRole() {
//   db.query("SELECT * FROM roles", function (err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       roleArr.push(res[i].title);
//     }
//   });
//   return roleArr;
// }

// //Select Managers for Add employee function
// let managersArr = [];
// function addManager() {
//   db.query(
//     "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
//     function (err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         managersArr.push(res[i].first_name);
//       }
//     }
//   );
//   return managersArr;
// }

// // Add role function
// function addRole() {
//   db.query(
//     "SELECT roles.title AS Title, roles.id AS Id, roles.department AS Department, roles.salary AS Salary FROM role",
//     function (err, res) {
//       inquirer
//         .prompt([
//           {
//             type: "input",
//             name: "title",
//             message: "what is the roles title?",
//           },
//           {
//             type: "input",
//             name: "department",
//             message: "In which department is this role?",
//           },
//           {
//             type: "input",
//             name: "managerId",
//             message: "Enter their managers id",
//           },
//           //   {
//           //     type: "input",
//           //     name: "salary",
//           //     message: "What is the salary?",
//           //   },
//         ])
//         .then(function (res) {
//           db.query(
//             "INSERT INTO roles SET ?",
//             {
//               title: res.Title,
//               salary: res.Salary,
//             },
//             function (err) {
//               if (err) throw err;
//               console.table(res);
//               startPrompt();
//             }
//           );
//         });
//     }
//   );
// }

// // Add an employee
// function addEmployee() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "firstName",
//         message: "What is the employees first name?",
//       },
//       {
//         type: "input",
//         name: "lastName",
//         message: "What is the employees last name?",
//       },
//       {
//         name: "role",
//         type: "list",
//         message: "What is the role",
//         choices: selectRole(),
//       },
//       {
//         type: "input",
//         name: "manager",
//         message: "Who is the employees manager?",
//         choices: addManager(),
//       },
//     ])
// //     .then(function (userChoice) {
// //     //   const rolesId = viewAllRoles().indexOf(userChoice.roles) + 1;
// //     //   const managerId = selectManager().indexOf(userChoice) + 1;
// //       db.query(
// //         `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
// //         // {
// //         //   first_name: userChoice.firstName,
// //         //   last_name: userChoice.lastName,
// //         //   manager_id: managerId,
// //         //   role_id: rolesId,
// //         // },
// //         function (err) {
// //           if (err) throw err;
// //           console.table(userChoice);
// //           startPrompt();
// //         }
// //       );
// //     });
// // }

// Add new department

createDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "departments_name",
        message: "Enter the department name you would like to add",
      },
    ])
    .then(addDepartment);
};

function addDepartment(createDepartment) {
  const sql = `INSERT INTO
        departments (departments_name) VALUES ('${createDepartment.departments_name}');`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

// Update an employee role

// Update an employee role function

//Add Department
// (SELECT department_id AS id, department.name AS department, SUM(salary) AS budget FROM  roles INNER JOIN department ON roles.department_id = department.id inner join employee on employee.role_id = roles.id where department.id = "1");

// "SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.name AS department, roles.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee employee LEFT JOIN employee m ON employee.manager_id = m.id INNER JOIN roles ON employee.role_id = roles.id INNER JOIN departments ON roles.departments_id = departments.id ORDER BY ID ASC"
