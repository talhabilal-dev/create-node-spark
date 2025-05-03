import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export async function setupNpm(projectName) {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`❌ Project folder already exists. Choose a different name.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  process.chdir(projectPath);

  console.log("📦 Initializing npm...");
  execSync("npm init -y", { stdio: "inherit" });
}
