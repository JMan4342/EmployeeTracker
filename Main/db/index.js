const createEmployee = () => {
    console.log('Inserting a new employee...\n');
    const query = connection.query(
      'INSERT INTO employee SET ?',
      {
        firstname,
        lastname,
        roleID,
        managerID
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} employee inserted!\n`);
        // Call updateProduct AFTER the INSERT completes
        updateEmployee();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  };

createEmployee("employees", {
    firstname: "",
    lastname: "",
    roleID: "",
    managerID: ""
})

createRole("roles", {
    title: "",
    salary: "",
    departmentID: ""
})

createDept("departments", {
    name: ""
})