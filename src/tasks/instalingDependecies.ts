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

const execPromise = promisify(exec);

export async function installDependencies(args: DependencyConfig): Promise<void> {
  const install = async (cmd: string, label: string): Promise<void> => {
    try {
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
    await install("npm install express dotenv", "express + dotenv");
    if (isTS) {
      await install(
        "npm install @types/express typescript tsx @types/node --save-dev",
        "TypeScript tooling"
      );
    } else {
      await install("npm install nodemon --save-dev", "nodemon");
    }
  } else {
    // Raw Node.js still needs dotenv if you want .env support
    await install("npm install dotenv", "dotenv");
    if (isTS) {
      await install("npm install typescript tsx @types/node --save-dev", "TypeScript tooling");
    } else {
      await install("npm install nodemon --save-dev", "nodemon");
    }
  }

  // Optional ESLint feature
  if (args.features.includes("eslint")) {
    await install("npm install eslint eslint-plugin-n eslint-plugin-promise --save-dev", "ESLint + plugins");
  }
}
