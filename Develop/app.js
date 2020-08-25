const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let questions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your employee ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "list",
    message: "What role do you have?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "role",
  },
  {
    type: "input",
    message: "What is your office number",
    name: "officeNumber",
    when: function (answers) {
      return answers.role === "Manager";
    },
    validate: function (value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return "Please enter a valid phone number";
    },
  },
  {
    type: "input",
    message: "What is your GitHub ID?",
    name: "github",
    when: function (answers) {
      return answers.role === "Engineer";
    },
  },
  {
    type: "input",
    message: "What school do you go to?",
    name: "school",
    when: function (answers) {
      return answers.role === "Intern";
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log("\nEmployee Information:");
  console.log(JSON.stringify(answers, null, "  "));
});
