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

interface DependencyCollection {
  production: string[];
  development: string[];
}

export async function installDependencies(args: DependencyConfig): Promise<void> {
  const deps: DependencyCollection = {
    production: [],
    development: []
  };

  const isTS = args.language === "TypeScript";

  // Base framework dependencies
  if (args.framework === "Express") {
    deps.production.push("express", "dotenv");
    if (isTS) {
      deps.development.push("@types/express", "typescript", "tsx", "@types/node");
    } else {
      deps.development.push("nodemon");
    }
  } else if (args.framework === "Fastify") {
    deps.production.push("fastify", "dotenv");
    if (isTS) {
      deps.development.push("@types/node", "typescript", "tsx");
    } else {
      deps.development.push("nodemon");
    }
  } else {
    // Raw Node.js still needs dotenv for .env support
    deps.production.push("dotenv");
    if (isTS) {
      deps.development.push("typescript", "tsx", "@types/node");
    } else {
      deps.development.push("nodemon");
    }
  }

  // Database dependencies
  if (args.database === "MongoDB") {
    deps.production.push("mongoose");
    if (isTS) {
      deps.development.push("@types/mongoose");
    }
  } else if (args.database === "MySQL") {
    deps.production.push("knex", "mysql2");
    if (isTS) {
      deps.development.push("@types/mysql2");
    }
  } else if (args.database === "PostgreSQL") {
    deps.production.push("@prisma/client");
    deps.development.push("prisma");
    if (isTS) {
      // Prisma generates its own types, no additional type packages needed
    }
  }

  // Feature dependencies
  if (args.features.includes("eslint")) {
    if (isTS) {
      deps.development.push(
        "@eslint/js",
        "typescript-eslint",
        "eslint",
        "eslint-plugin-n",
        "eslint-plugin-promise",
        "prettier"
      );
    } else {
      deps.development.push(
        "@eslint/js",
        "eslint",
        "eslint-plugin-n",
        "eslint-plugin-promise",
        "prettier"
      );
    }
  }

  if (args.features.includes("multer")) {
    deps.production.push("multer");
    if (isTS) {
      deps.development.push("@types/multer");
    }
  }

  // Install all dependencies at once
  try {
    // Install production dependencies
    if (deps.production.length > 0) {
      const prodPackages = deps.production.join(" ");
      const prodCmd = getInstallCommand(args.packageManager, prodPackages, false);
      logInstalling(`Production dependencies (${deps.production.length} packages)`);
      logInfo(`Installing: ${deps.production.join(", ")}`);
      await execPromise(prodCmd);
      logSuccess(`Production dependencies installed successfully!`, false);
    }

    // Install development dependencies
    if (deps.development.length > 0) {
      const devPackages = deps.development.join(" ");
      const devCmd = getInstallCommand(args.packageManager, devPackages, true);
      logInstalling(`Development dependencies (${deps.development.length} packages)`);
      logInfo(`Installing: ${deps.development.join(", ")}`);
      await execPromise(devCmd);
      logSuccess(`Development dependencies installed successfully!`, false);
    }

    logSuccess(`🎉 All dependencies installed in 2 batches instead of ${getTotalInstallCount(args)} separate installs!`);

  } catch (err: any) {
    logError(`Failed to install dependencies: ${err.message}`);
    throw err;
  }
}

function getTotalInstallCount(args: DependencyConfig): number {
  let count = 0;

  // Base framework + language
  count += 2; // Express/dotenv + TypeScript/nodemon

  // Database
  if (args.database !== "none") {
    count += 1;
  }

  // Features
  if (args.features.includes("eslint")) {
    count += 1;
  }
  if (args.features.includes("multer")) {
    count += 1;
  }

  return count;
}
