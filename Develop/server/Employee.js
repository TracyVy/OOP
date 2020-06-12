// TODO: Write code to define and export the Employee class
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let questions = [
  {
    type: "input",
    message: "What is your name?",
    name: "empName",
  },
  {
    type: "input",
    message: "what is your employee ID?",
    name: "empID",
  },
  {
    type: "list",
    message: "What role do you have?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "empRole",
  },
];

inquirer.prompt(questions).then((answers) => {
  if (answers.empRole === "Intern") {
    let questions = [
      {
        type: "input",
        message: "What school do you go to?",
        name: "school",
      },
    ];
  } else {
    let questions = [
      {
        type: "input",
        message: "What is your Github ID?",
        name: "githubID",
      },
    ];
  }
});
