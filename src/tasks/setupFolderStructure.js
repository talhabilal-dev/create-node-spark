import fs from "fs";
import path from "path";

export async function setupFolderStructure(projectName) {
  console.log("📁 Creating project folders...");
  const base = path.join(process.cwd(), "src");
  fs.mkdirSync(base);
  fs.mkdirSync(path.join(base, "controllers"));
  fs.mkdirSync(path.join(base, "models"));
  fs.mkdirSync(path.join(base, "routes"));
  fs.mkdirSync(path.join(base, "middlewares"));
  fs.mkdirSync(path.join(base, "config"));
}
