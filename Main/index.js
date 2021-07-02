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
  inquirer
    .prompt({
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
    .then(function (data) {
      if (data.option === "Add employee") {
        createEmployee();
      } else if (data.option === "Add role") {
        createRole();
      } else if (data.option === "Add department") {
        createDept();
      } else if (data.option === "View employee") {
        viewEmployee();
      } else if (data.option === "View role") {
        viewRole();
      } else if (data.option === "View department") {
        viewDept();
      } else if (data.option === "Update employee role") {
        updateEmployee();
      } else {
        console.log("Good bye!");
        process.exit(0);
      }
    });
}

function createEmployee() {
  const { first_name, last_name, role_id, manager_id } = inquirer
    .prompt([
      {
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        message: "What is the employee's role?",
        name: "role_id",
      },
      {
        message: "What is the employee's manager's id?",
        name: "manager_id",
      },
    ])
    .then((data) => {
      const query = connection.query("INSERT INTO employee SET ? WHERE ?", {
        first_name,
        last_name,
        role_id,
        manager_id,
      });
      console.log(data);
      userMenu();
    });
  // .then(
  //   connection.query(
  // "INSERT INTO employee SET ?",
  // {
  //   first_name,
  //   last_name,
  //   role_id,
  //   manager_id,
  // },
  //     (err, res) => {
  //       if (err) throw err;
  //       console.log(`${res.affectedRows} employee created!\n`);
  //       userMenu()
  //     }
  //   )
  // );
}

function createRole() {
  const { title, salary, department_id } = inquirer
    .prompt([
      {
        message: "What is the role's title?",
        name: "title",
      },
      {
        message: "What is the annual salary of the role?",
        name: "salary",
      },
      {
        message: "What is the department id for this role?",
        name: "department_id",
      },
    ])
    .then((data) => {
      const query = connection.query("INSERT INTO role SET ? WHERE ?", {
        title,
        salary,
        department_id,
      });
      userMenu();
    });
}

function createDept() {
  const { name } = inquirer
    .prompt([
      {
        message: "What is the name of the department?",
        name: "name",
      },
    ])
    .then((data) => {
      const query = connection.query("INSERT INTO department SET ? WHERE ?", {
        name,
      });
      userMenu();
    });
}

function viewEmployee() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
  userMenu();
}

function viewRole() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
  userMenu();
}

function viewDept() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
  userMenu();
}

// function updateEmployee() {

// }

connection.connect((err) => {
  if (err) throw err;
  userMenu();
});
