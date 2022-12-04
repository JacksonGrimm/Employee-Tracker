const { prompt } = require("inquirer");
const DataBase = require("./classes/databaseClass");

loop = true;

dataBase = new DataBase();

const classAddToTable = async (table, action) => {
  //example
  //   dataBase.addToTable("department", departmentName.name);
  return await dataBase.addToTable(table, action);
};

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
        await classAddToTable("department", departmentName.name);
        break;
      case "View Departments":
        jobDetails = await prompt([
          {
            name: "info",
            type: "input",
            message: "Whats the Engineers Github?",
          },
        ]);
        employeeArr.push(
          new Engineer(
            userInput.employeeName,
            userInput.employeeId,
            userInput.employeeEmail,
            jobDetails.info
          )
        );
        break;
      case "Remove Department":
        jobDetails = await prompt([
          {
            name: "info",
            type: "input",
            message: "Whats the Interns school?",
          },
        ]);
        employeeArr.push(
          new Intern(
            userInput.employeeName,
            userInput.employeeId,
            userInput.employeeEmail,
            jobDetails.info
          )
        );
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
