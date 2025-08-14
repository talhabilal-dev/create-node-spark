// src/prompts/prompt.js
import inquirer from "inquirer";
import { ProjectDetails } from "../types/index.js";
import { logHeader, colors } from "../utils/logger.js";
import { checkDirectoryExists } from "../utils/fileSystem.js";
import path from "path";

async function askProjectDetails(): Promise<ProjectDetails> {
  logHeader("Project Configuration");

  const questions = [
    {
      type: "input",
      name: "projectName",
      message: `${colors.brightCyan}🏗️  Enter your project name:${colors.reset}`,
      validate: function (input: string) {
        // Check project name format
        if (!/^([a-z0-9\-_]+)$/.test(input)) {
          return `${colors.brightRed}❌ Project name may only include lowercase letters, numbers, underscores, and hyphens.${colors.reset}`;
        }

        // Check if directory already exists
        const projectPath = path.join(process.cwd(), input);
        if (checkDirectoryExists(projectPath)) {
          return `${colors.brightRed}❌ Directory "${input}" already exists. Please choose a different name.${colors.reset}`;
        }

        return true;
      },
      default: "my-backend-app",
    },
    {
      type: "list",
      name: "packageManager",
      message: `${colors.brightGreen}📦 Choose your package manager:${colors.reset}`,
      choices: [
        { name: `${colors.brightYellow}📦 npm${colors.reset}`, value: "npm" },
        { name: `${colors.brightMagenta}⚡ pnpm${colors.reset}`, value: "pnpm" }
      ],
      default: "npm",
    },
    {
      type: "list",
      name: "language",
      message: `${colors.brightMagenta}⚡ Choose your development language:${colors.reset}`,
      choices: [
        { name: `${colors.brightBlue}🟦 JavaScript${colors.reset}`, value: "JavaScript" },
        { name: `${colors.brightBlue}🟪 TypeScript${colors.reset}`, value: "TypeScript" }
      ],
      default: "JavaScript",
    },
    {
      type: "list",
      name: "framework",
      message: `${colors.brightYellow}🚀 Choose your web framework:${colors.reset}`,
      choices: [
        { name: `${colors.dim}⚪ None (Pure Node.js)${colors.reset}`, value: "none" },
        { name: `${colors.brightGreen}🟢 Express.js${colors.reset}`, value: "Express" }
      ],
      default: "none",
    },
    {
      type: "list",
      name: "database",
      message: `${colors.brightCyan}🗄️  Choose your database:${colors.reset}`,
      choices: [
        { name: `${colors.dim}⚪ None${colors.reset}`, value: "none" },
        { name: `${colors.brightGreen}🍃 MongoDB${colors.reset}`, value: "MongoDB" },
        { name: `${colors.brightBlue}🐬 MySQL${colors.reset}`, value: "MySQL" }
      ],
      default: "none",
    },
    {
      type: "checkbox",
      name: "features",
      message: `${colors.brightMagenta}✨ Select additional features:${colors.reset}`,
      choices: [
        {
          name: `${colors.brightYellow}🔍 ESLint (Code Linting)${colors.reset}`,
          value: "eslint"
        },
        {
          name: `${colors.brightCyan}📁 Multer (File Uploads)${colors.reset}`,
          value: "multer"
        }
      ],
      default: [],
    },
  ];

  console.log(`${colors.dim}Use arrow keys to navigate, space to select, and enter to confirm${colors.reset}`);
  console.log();

  const answers = await inquirer.prompt(questions as any);

  console.log();
  console.log(`${colors.brightGreen}✅ Configuration complete!${colors.reset}`);
  console.log(`${colors.dim}─────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.brightWhite}📋 Project Summary:${colors.reset}`);
  console.log(`   ${colors.brightCyan}Name:${colors.reset} ${colors.brightWhite}${answers.projectName}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Package Manager:${colors.reset} ${colors.brightWhite}${answers.packageManager}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Language:${colors.reset} ${colors.brightWhite}${answers.language}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Framework:${colors.reset} ${colors.brightWhite}${answers.framework}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Database:${colors.reset} ${colors.brightWhite}${answers.database}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Features:${colors.reset} ${colors.brightWhite}${answers.features.length > 0 ? answers.features.join(', ') : 'None'}${colors.reset}`);
  console.log(`${colors.dim}─────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log();

  return answers as ProjectDetails;
}

export { askProjectDetails };
