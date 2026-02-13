// src/prompts/prompt.js
import inquirer from "inquirer";
import { ProjectDetails } from "../types/index.js";
import { logHeader, colors } from "../utils/logger.js";
import { checkDirectoryExists } from "../utils/fileSystem.js";
import path from "path";

async function askProjectDetails(prefilledConfig?: Partial<ProjectDetails>): Promise<ProjectDetails> {
  logHeader("Project Configuration");

  const questions = [];

  // Only ask for project name if not provided via flags
  if (!prefilledConfig?.projectName) {
    questions.push({
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
    });
  }

  // Only ask for package manager if not provided via flags
  if (!prefilledConfig?.packageManager) {
    questions.push({
      type: "list",
      name: "packageManager",
      message: `${colors.brightGreen}📦 Choose your package manager:${colors.reset}`,
      choices: [
        { name: `${colors.brightYellow}📦 npm${colors.reset}`, value: "npm" },
        { name: `${colors.brightMagenta}⚡ pnpm${colors.reset}`, value: "pnpm" }
      ],
      default: "npm",
    });
  }

  // Only ask for language if not provided via flags
  if (!prefilledConfig?.language) {
    questions.push({
      type: "list",
      name: "language",
      message: `${colors.brightMagenta}⚡ Choose your development language:${colors.reset}`,
      choices: [
        { name: `${colors.brightBlue}🟦 JavaScript${colors.reset}`, value: "JavaScript" },
        { name: `${colors.brightBlue}🟪 TypeScript${colors.reset}`, value: "TypeScript" }
      ],
      default: "JavaScript",
    });
  }

  // Only ask for framework if not provided via flags
  if (!prefilledConfig?.framework) {
    questions.push({
      type: "list",
      name: "framework",
      message: `${colors.brightYellow}🚀 Choose your web framework:${colors.reset}`,
      choices: [
        { name: `${colors.dim}⚪ None (Pure Node.js)${colors.reset}`, value: "none" },
        { name: `${colors.brightGreen}🟢 Express.js${colors.reset}`, value: "Express" },
        { name: `${colors.brightCyan}⚡ Fastify${colors.reset}`, value: "Fastify" }
      ],
      default: "none",
    });
  }

  // Only ask for database if not provided via flags
  if (!prefilledConfig?.database) {
    questions.push({
      type: "list",
      name: "database",
      message: `${colors.brightCyan}🗄️  Choose your database:${colors.reset}`,
      choices: [
        { name: `${colors.dim}⚪ None${colors.reset}`, value: "none" },
        { name: `${colors.brightGreen}🍃 MongoDB${colors.reset}`, value: "MongoDB" },
        { name: `${colors.brightBlue}🐬 MySQL${colors.reset}`, value: "MySQL" },
        { name: `${colors.brightMagenta}🐘 PostgreSQL + Prisma${colors.reset}`, value: "PostgreSQL" }
      ],
      default: "none",
    });
  }

  let answers: any = {};

  // Only prompt if there are questions to ask
  if (questions.length > 0) {
    console.log(`${colors.dim}Use arrow keys to navigate, space to select, and enter to confirm${colors.reset}`);
    console.log();
    answers = await inquirer.prompt(questions as any);
  }

  // Ask for features separately (after basic configuration)
  if (!prefilledConfig?.features) {
    console.log(`${colors.dim}Press space to select, enter to confirm${colors.reset}`);
    const featuresAnswer = await inquirer.prompt([{
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
        },
        {
          name: `${colors.brightBlue}🐳 Docker (Containerization)${colors.reset}`,
          value: "docker"
        }
      ],
      default: [],
    }]);
    answers.features = featuresAnswer.features;
  }

  // Merge prefilled config with answers
  const finalConfig: ProjectDetails = {
    projectName: prefilledConfig?.projectName || answers.projectName || 'my-backend-app',
    packageManager: prefilledConfig?.packageManager || answers.packageManager || 'npm',
    language: prefilledConfig?.language || answers.language || 'JavaScript',
    framework: prefilledConfig?.framework || answers.framework || 'none',
    database: prefilledConfig?.database || answers.database || 'none',
    features: prefilledConfig?.features || answers.features || [],
  };

  console.log();
  console.log(`${colors.brightGreen}✅ Configuration complete!${colors.reset}`);
  console.log(`${colors.dim}─────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.brightWhite}📋 Project Summary:${colors.reset}`);
  console.log(`   ${colors.brightCyan}Name:${colors.reset} ${colors.brightWhite}${finalConfig.projectName}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Package Manager:${colors.reset} ${colors.brightWhite}${finalConfig.packageManager}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Language:${colors.reset} ${colors.brightWhite}${finalConfig.language}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Framework:${colors.reset} ${colors.brightWhite}${finalConfig.framework}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Database:${colors.reset} ${colors.brightWhite}${finalConfig.database}${colors.reset}`);
  console.log(`   ${colors.brightCyan}Features:${colors.reset} ${colors.brightWhite}${finalConfig.features.length > 0 ? finalConfig.features.join(', ') : 'None'}${colors.reset}`);
  console.log(`${colors.dim}─────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log();

  return finalConfig;
}

export { askProjectDetails };
