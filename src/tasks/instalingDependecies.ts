import { exec } from "child_process";
import { promisify } from "util";
import {
  logInfo,
  logSuccess,
  logWarning,
  logError,
  logInstalling,
  colors
} from "../utils/logger.js";
import { DependencyConfig } from "../types/index.js";
import { getInstallCommand } from "../utils/packageManager.js";

const execPromise = promisify(exec);

export async function installDependencies(args: DependencyConfig): Promise<void> {
  const install = async (packages: string, label: string, isDev: boolean = false): Promise<void> => {
    try {
      const cmd = getInstallCommand(args.packageManager, packages, isDev);
      logInstalling(label);
      await execPromise(cmd);
      logSuccess(`${label} installed successfully!`, false);
    } catch (err: any) {
      logError(`Failed to install ${label}: ${err.message}`);
    }
  };

  const isTS = args.language === "TypeScript";

  // Base framework setup
  if (args.framework === "Express") {
    await install("express dotenv", "express + dotenv");
    if (isTS) {
      await install(
        "@types/express typescript tsx @types/node",
        "TypeScript tooling",
        true
      );
    } else {
      await install("nodemon", "nodemon", true);
    }
  } else {
    // Raw Node.js still needs dotenv if you want .env support
    await install("dotenv", "dotenv");
    if (isTS) {
      await install("typescript tsx @types/node", "TypeScript tooling", true);
    } else {
      await install("nodemon", "nodemon", true);
    }
  }

  // Optional ESLint feature
  if (args.features.includes("eslint")) {
    if (args.language === "TypeScript") {
      await install(
        "@eslint/js typescript-eslint eslint eslint-plugin-n eslint-plugin-promise prettier",
        "ESLint + TypeScript plugins + Prettier",
        true
      );
    } else {
      await install(
        "@eslint/js eslint eslint-plugin-n eslint-plugin-promise prettier",
        "ESLint + plugins + Prettier",
        true
      );
    }
  }
}
