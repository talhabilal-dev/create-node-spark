// src/prompts/prompt.js
import inquirer from "inquirer";

async function askProjectDetails() {
  const questions = [
    {
      type: "input",
      name: "projectName",
      message: "Enter the name for your new project:",
      validate: function (input) {
        if (/^([a-z0-9\-_]+)$/.test(input)) return true;
        else
          return "Project name may only include lowercase letters, numbers, underscores, and hyphens.";
      },
      default: "my-backend-app",
    },
    {
      type: "list",
      name: "language",
      message: "Choose the primary language:",
      choices: ["JavaScript", "TypeScript"],
      default: "JavaScript",
    },
    {
      type: "list",
      name: "framework",
      message: "Choose the web framework:",
      choices: ["none", "Express"],
      default: "none",
    },
    {
      type: "list",
      name: "database",
      message: "Choose the database:",
      choices: ["none", "MongoDB"],
      default: "none",
    },
    {
      type: "checkbox",
      name: "features",
      message:
        "Select optional features (Press <space> to select, <a> to toggle all, <i> to invert selection):",
      choices: [
        { name: "ESLint (Linter)", value: "eslint" },
        // { name: "Database (Basic Setup - Placeholder)", value: "database" }, // Placeholder for now
        { name: "Multer (File Uploads)", value: "multer" }, // Placeholder for now
      ],
      default: [], // No features selected by default
    },
  ];

  const answers = await inquirer.prompt(questions);
  console.log("Selected options:", answers);

  return answers;
}

export { askProjectDetails };
