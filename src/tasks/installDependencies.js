import { execSync } from "child_process";

export async function installDependencies(
  useAuth,
  useMulter,
  useLint = "n",
  useDb
) {
  console.log("📥 Installing core dependencies...");
  execSync("npm install express dotenv", { stdio: "inherit" });

  if (useAuth.toLowerCase() === "y") {
    console.log("🔐 Installing auth dependencies...");
    execSync("npm install argon2 jsonwebtoken", { stdio: "inherit" });
  }

  if (useMulter.toLowerCase() === "y") {
    console.log("📂 Installing Multer...");
    execSync("npm install multer", { stdio: "inherit" });
  }

  if (useDb.toLowerCase() === "y") {
    console.log("🗄️ Installing MongoDB dependencies...");
    execSync("npm install mongoose", { stdio: "inherit" });
  }

  console.log("📦 Installing dev dependencies...");

  execSync("npm install --save-dev nodemon", { stdio: "inherit" });
  if (useLint.toLowerCase() === "y") {
    console.log("🔍 Installing ESLint...");
    execSync(
      "npm install --save-dev eslint eslint-plugin-n eslint-plugin-promise",
      {
        stdio: "inherit",
      }
    );
  }

  console.log("⚙️ Installing dev dependencies...");
  execSync("npm install --save-dev nodemon", { stdio: "inherit" });
}
