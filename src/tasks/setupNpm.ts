import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { logError, logProgress, colors } from "../utils/logger.js";
import { configurePackageJson } from "./configurePackageJson.js";
import { configureTsConfig } from "./configureTsConfig.js";
import { createDirectory } from "../utils/fileSystem.js";

export async function setupNpm(projectName: string, language: string): Promise<void> {

  try {
    const projectPath = path.join(process.cwd(), projectName);

    await createDirectory(projectPath);
    process.chdir(projectPath);

    logProgress(`${colors.brightCyan}📦 Initializing npm package...${colors.reset}`);
    execSync("npm init -y", { stdio: "ignore" });

    await configurePackageJson(projectName, language);

    if (language === "TypeScript") {
      logProgress(`${colors.brightBlue}⚙️  Setting up TypeScript configuration...${colors.reset}`);
      await configureTsConfig(projectName);
    }
  } catch (error) {
    throw error;

  }

}
