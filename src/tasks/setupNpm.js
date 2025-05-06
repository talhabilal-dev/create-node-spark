import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { logError, logInfo } from "../utils/logger.js";
import { configurePackageJson } from "./configurePackageJson.js";
import { configureTsConfig } from "./configureTsConfig.js";
import { createDirectory } from "../utils/fileSystem.js";

export async function setupNpm(projectName, language) {

  try {
    const projectPath = path.join(process.cwd(), projectName);

    await createDirectory(projectPath);
    process.chdir(projectPath);

    logInfo("📦 Initializing npm...");
    execSync("npm init -y", { stdio: "ignore" });

    await configurePackageJson(projectName, language);

    if (language === "TypeScript") {

      await configureTsConfig(projectName);

    }
  } catch (error) {
    throw error;

  }

}
