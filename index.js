const { prompt } = require("inquirer");

loop = true;

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
    switch (userInput.employeeJob) {
      case "Manager":
        jobDetails = await prompt([
          {
            name: "info",
            type: "input",
            message: "Whats the managers office number?",
          },
        ]);
        employeeArr.push(
          new Manager(
            userInput.employeeName,
            userInput.employeeId,
            userInput.employeeEmail,
            jobDetails.info
          )
        );
        break;
      case "Engineer":
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
      case "Intern":
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
    }
  }
};

start();
