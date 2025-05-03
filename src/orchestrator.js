import { askQuestion } from "./utils/askQuestion.js";
import { setupNpm } from "./tasks/setupNpm.js";
import { installDependencies } from "./tasks/installDependencies.js";
import { setupFolderStructure } from "./tasks/setupFolderStructure.js";
import { setupEnv } from "./tasks/setupEnv.js";
import { addAuth } from "./tasks/addAuth.js";
import { addMulter } from "./tasks/addMulter.js";
import { configureScripts } from "./tasks/configureScripts.js";
import { configurePackageJson } from './tasks/configurePackageJson.js';

export async function orchestrateSetup() {
  console.log("🚀 Welcome to create-node-backend!");

  const projectName = await askQuestion("Project name: ");
  const useAuth = await askQuestion("Include auth? (y/n): ");
  const useMulter = await askQuestion("Include Multer (file uploads)? (y/n): ");

  await setupNpm(projectName);
  await installDependencies(useAuth, useMulter);
  await setupFolderStructure(projectName);
  await setupEnv(projectName);
  if (useAuth.toLowerCase() === "y") await addAuth(projectName);
  if (useMulter.toLowerCase() === "y") await addMulter(projectName);
  await configureScripts(projectName);
  await configurePackageJson(projectName);

  console.log(`👉 Project "${projectName}" created!`);
  console.log(`👉 Run: cd ${projectName} && npm run dev`);
}
