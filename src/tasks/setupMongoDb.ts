import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { logDatabaseSetup } from "../utils/logger.js";

export async function setupMongoDb(projectName: string, language: string, packageManager: 'npm' | 'pnpm'): Promise<void> {
  try {
    logDatabaseSetup("MongoDB");
    // Note: mongoose dependency is now installed in installDependencies function

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