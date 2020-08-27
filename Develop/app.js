const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const employeeQuestions = require("./employeeQuestions");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const getEmployeeInputsFromCli = async (inputs = []) => {
  const questions = employeeQuestions;

  const { addEmp, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...inputs, answers];
  return addEmp ? empInputs(newInputs) : newInputs;
};

const empAnswers = async () => {
  const inputs = await getEmployeeInputsFromCli();
  console.log(inputs);

  let employees = createArrayOfEmployeeObjects(inputs);

  renderEmployeeHtml(employees);
};

function renderEmployeeHtml(employees) {
  //
  let output = render(employees);
  fs.writeFile("./output/team.html", output, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    }
  });
}

function createArrayOfEmployeeObjects(inputs) {
  let employees = []; // array of employees

  inputs.forEach((answers) => {
    // console.log("XXX answers", answers);
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
  });
  // console.log("XXX employees", employees);

  return employees;
}

empAnswers();
