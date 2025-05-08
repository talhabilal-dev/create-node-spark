import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);
export async function setupDb(projectName, language) {
  try {


    await execPromise("npm install mongoose", { stdio: "ignore" });

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

    throw new error;

  }

}