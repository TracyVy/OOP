const inquirer = require("inquirer");

const empInputs = async (inputs = []) => {
  const questions = [
    {
      type: "input",
      name: "inputValue",
      message: "Enter some input: ",
    },
    {
      type: "confirm",
      name: "addEmp",
      message: "Enter another input? ",
      default: true,
    },
  ];

  const { addEmp, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...inputs, answers];
  return addEmp ? empInputs(newInputs) : newInputs;
};

const empAnswers = async () => {
  const inputs = await empInputs();
  console.log(inputs);
};

empAnswers();
