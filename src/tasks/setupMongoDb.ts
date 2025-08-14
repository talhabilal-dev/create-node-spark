import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { logDatabaseSetup, logInstalling } from "../utils/logger.js";
import { getInstallCommand } from "../utils/packageManager.js";

const execPromise = promisify(exec);

export async function setupMongoDb(projectName: string, language: string, packageManager: 'npm' | 'pnpm'): Promise<void> {
  try {
    logDatabaseSetup("MongoDB");
    logInstalling("mongoose");
    const mongooseCmd = getInstallCommand(packageManager, "mongoose");
    await execPromise(mongooseCmd);

    const extension = language === "TypeScript" ? "ts" : "js";

    const configDbPath = path.join(process.cwd(), "src", "config", `db.config.${extension}`);

    const configDbContent = language === "TypeScript" ? `import mongoose from "mongoose";
import ENV from "./env.config";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
`: `import mongoose from "mongoose";
import ENV from "./env.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
`;

    writeFile(configDbPath, configDbContent.trim(), "utf-8")

  }


  catch (error) {

    throw error;

  }

}