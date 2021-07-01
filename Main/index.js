const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employeeDB",
});


function userMenu() {
  inquirer.prompt({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "Add employee",
      "Add role",
      "Add department",
      "View employee",
      "View role",
      "View department",
      "Update employee role",
      "Exit",
    ],
  })
.then(function(data){
  if (option === "Add employee") {
    createEmployee();
  } else if (option === "Add role") {
    createRole();
  } else if (option === "Add department") {
    createDept();
  } else if (option === "View employee") {
    viewEmployee();
  } else if (option === "View role") {
    viewRole();
  } else if (option === "View department") {
    viewDept();
  } else if (option === "Update employee role") {
    updateEmployee();
  } else {
    console.log("Good bye!");
    process.exit(0);
  }
})
}

connection.connect((err) => {
  if (err) throw err;
  userMenu();
});
