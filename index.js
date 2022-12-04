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
          "Remove Department",
          "Add Role",
          "View Roles",
          "Remove Role",
          "Add Employee",
          "View Employees",
          "Remove Employee",
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
        break;
      case "View Roles":
        console.log("View Roles");
        break;
      case "Remove Role":
        console.log("Remove Role");
        break;
      case "Add Employee":
        console.log("Add Employee");
        break;
      case "View Employees":
        console.log("View Employee");
        break;
      case "Remove Employee":
        console.log("Remove Employee");
        break;
    }
  }
};

start();
