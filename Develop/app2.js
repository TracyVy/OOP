const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const empInputs = async (inputs = []) => {
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
    {
      type: "confirm",
      name: "addEmp",
      message: "Would you like to add another employee? ",
      default: true,
    },
  ];

  const { addEmp, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...inputs, answers];
  return addEmp ? empInputs(newInputs) : newInputs;
};

// inquirer.prompt(empInputs).then((answers) => {
//   console.log("\nEmployee Information:");
//   console.log(JSON.stringify(answers, null, "  "));

// const empAnswers = async () => {
//   const inputs = await empInputs();
//   console.log(inputs);
// };

// empAnswers();

let employees = [];
if (answers.role === "Manager") {
  let manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
  employees.push(manager);
} else if (answers.role === "Engineer") {
  let engineer = new Engineer(
    answers.name,
    answers.id,
    answers.email,
    answers.github
  );
  employees.push(engineer);
} else if (answers.role === "Intern") {
  let intern = new Intern(
    answers.name,
    answers.id,
    answers.email,
    answers.school
  );
  employees.push(intern);
}

console.log(employees);

let output = render(employees);

console.log("XXX templateOutput", output);
fs.writeFile("./output/team.html", output, (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
  }
});
