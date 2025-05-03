import fs from "fs";
import path from "path";

export async function configurePackageJson(projectName) {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  // Ensure ESM
  packageJson.type = "module";

  // Add dev script
  packageJson.scripts = {
    ...packageJson.scripts,
    dev: "nodemon src/index.js",
  };

  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json updated: added "type": "module" and dev script');
}
