const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  //my MySQL username,
  user: "root",
  //MY MySQL password
  password: "password",
  database: "employee",
});

module.exports = db;
