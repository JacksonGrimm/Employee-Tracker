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
// dataBase.removeFromTable = promisify(dataBase.removeFromTable);

const start = async () => {
  while (loop) {
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
        ],
      },
    ]);
    console.log(userInput);
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
      case "Remove Department":
        departmentName = await prompt([
          {
            name: "name",
            type: "input",
            message: "Whats the department name?",
          },
        ]);
        dataBase.removeFromTable("department", departmentName.name).then();
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
      case "Remove Role":
        console.log("Remove Role");
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
      case "Remove Employee":
        console.log("Remove Employee");
        break;
    }
  }
};

start();
