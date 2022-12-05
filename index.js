const { prompt } = require("inquirer");
const { promisify } = require("util");
const DataBase = require("./classes/databaseClass");

//start loop to keep running the program
loop = true;
//custom database class
dataBase = new DataBase();
//promisying a method from the class
dataBase.addToTable = promisify(dataBase.addToTable);
dataBase.getTable = promisify(dataBase.getTable);
dataBase.editEmployee = promisify(dataBase.editEmployee);

//kicks of userinput loop
const start = async () => {
  while (loop) {
    //program start if false kills the loop
    startPrompt = await prompt([
      {
        type: "confirm",
        name: "continue",
        message: "Would you like to continue the program?",
      },
    ]);
    if (!startPrompt.continue) {
      loop = false;
      break;
    }
    //main user options
    userInput = await prompt([
      {
        name: "userAction",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add Department",
          "View Departments",
          "Add Role",
          "View Roles",
          "Add Employee",
          "View Employees",
          "Edit Employee",
        ],
      },
    ]);
    console.log(userInput);
    //switch statement for the options and runs dataBase class with different parameters depending on what was selected
    switch (userInput.userAction) {
      case "Add Department":
        departmentName = await prompt([
          {
            name: "name",
            type: "input",
            message: "Whats the department name?",
          },
        ]);
        //function takes augments takes string table name and array
        dataBase
          .addToTable("department", [departmentName.name])
          .then(console.log("Added to Department"));
        break;
      case "View Departments":
        dataBase.getTable("department").then();
        break;
      case "Add Role":
        console.log("Add Role");
        departmentName = await prompt([
          {
            name: "title",
            type: "input",
            message: "Whats the Roles Title?",
          },
          {
            name: "salary",
            type: "input",
            message: "Whats the Role Salary?",
          },
          {
            name: "department",
            type: "input",
            message: "Whats the department ID that this role is assigned to?",
          },
        ]);
        //function takes augments takes string table name and array
        dataBase
          .addToTable("role", [
            departmentName.title,
            departmentName.salary,
            departmentName.department,
          ])
          .then(console.log("Added to Role"));
        break;
      case "View Roles":
        dataBase.getTable("role").then();
        break;
      case "Add Employee":
        console.log("add Employee");
        departmentName = await prompt([
          {
            name: "firstName",
            type: "input",
            message: "Whats the Employees first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "Whats the Employees last name?",
          },
          {
            name: "role",
            type: "input",
            message: "Whats the role ID that this employee is assigned to?",
          },
          {
            name: "hasManager",
            type: "confirm",
            message: "does this employee have a manager?",
          },
        ]);
        const valuesArray = [
          departmentName.firstName,
          departmentName.lastName,
          departmentName.role,
        ];
        if (departmentName.hasManager) {
          (manager = await prompt({
            name: "manager",
            type: "input",
            message: "Whats the employees manager id?",
          })),
            valuesArray.push(manager.manager);
        }
        //function takes augments takes string table name and array
        dataBase
          .addToTable("employee", valuesArray, departmentName.hasManager)
          .then(console.log());
      case "View Employees":
        dataBase.getTable("employee").then();
        break;
      case "Edit Employee":
        userSelect = await prompt([
          {
            name: "employeeID",
            type: "input",
            message: "Whats the Employees ID you would like to change?",
          },
          {
            name: "newRole",
            type: "input",
            message: "what would you liked the employees new role to be?",
          },
        ]);
        dataBase.editEmployee(userSelect.employeeID, userSelect.newRole).then();
    }
  }
};

start();
