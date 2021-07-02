const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table")

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employeeDB",
});

async function userMenu() {
  try {
    const data = await inquirer
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
        updateEmpRole();
      } else {
        console.log("Good bye!");
        process.exit(0);
      }
  } catch (err) {
    console.log(err)
  }
}

async function createEmployee() {
  try  {
  const { first_name, last_name, role_id, manager_id } = await inquirer
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
      await connection.promise().query("INSERT INTO employee SET ?", {
        first_name,
        last_name,
        role_id,
        manager_id,
      }) 
      console.log("added user")
      userMenu();
  } catch (err) {
    console.log(err)
  }
}

async function createRole() {
  try {
  const { title, salary, department_id } = await inquirer
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
    await connection.promise().query("INSERT INTO role SET ?", {
      title,
      salary,
      department_id,
    })
    console.log("added role")
    userMenu();
    } catch(err) {
      console.log(err)
    }
}

async function createDept() {
  try {
  const { name } = await inquirer
    .prompt([
      {
        message: "What is the name of the department?",
        name: "name",
      },
    ])
      await connection.promise().query("INSERT INTO department SET ?", {
        name,
      });
      console.log("added department")
      userMenu();
  } catch (err) {
    console.log(err)
  }
}

async function viewEmployee() {
  try {
  const [res] = await connection.promise().query("SELECT * FROM employee")
    console.table(res);
  userMenu();
  } catch (err) {
    console.log(err)
  }
}

async function viewRole() {
  try {
    const [res] = await connection.promise().query("SELECT * FROM role")
      console.table(res);
    userMenu();
    } catch (err) {
      console.log(err)
    }
  }

async function viewDept() {
  try {
    const [res] = await connection.promise().query("SELECT * FROM department")
      console.table(res);
    userMenu();
    } catch (err) {
      console.log(err)
    }
  }

async function updateEmpRole() {
  try {
    const { role_id, id } = await inquirer
    .prompt([
      {
        message: "What is the ID number for the employee?",
        name: "id",
      },
      {
        message: "What is the new role ID you are updating to?",
        name: "role_id",
      },
    ])
    await connection.promise().query("UPDATE employee SET role_id WHERE id ?",
    {
      role_id, 
      id
    });
      console.table(res);
    userMenu();
    } catch (err) {
      console.log(err)
    }
}

connection.connect((err) => {
  if (err) throw err;
  userMenu();
});
