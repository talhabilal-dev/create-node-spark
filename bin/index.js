#!/usr/bin/env node
import { createInterface } from "readline";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  console.log("🚀 Welcome to create-node-backend!");

  const projectName = await ask("Project name: ");
  const useAuth = await ask("Include auth? (y/n): ");
  const useMulter = await ask("Include Multer (file uploads)? (y/n): ");

  rl.close();

  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Project folder already exists. Choose a different name.`);
    process.exit(1);
  }
  fs.mkdirSync(projectPath);

  process.chdir(projectPath);

  // Step 1: Initialize npm and Install Dependencies
  console.log("📦 Initializing npm...");
  execSync("npm init -y", { stdio: "inherit" });

  // Step 2: Install Dependencies
  console.log("📥 Installing required packages...");
  execSync("npm install express dotenv", { stdio: "inherit" });

  if (useAuth.toLowerCase() === "y") {
    console.log("🔐 Adding auth dependencies...");
    execSync("npm install argon2 jsonwebtoken", { stdio: "inherit" });
  }

  if (useMulter.toLowerCase() === "y") {
    console.log("📂 Adding Multer...");
    execSync("npm install multer", { stdio: "inherit" });
  }

  console.log("⚙️ Installing dev dependencies...");
  execSync("npm install --save-dev nodemon", { stdio: "inherit" });

  // Step 3: Modify package.json for ES Modules
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  packageJson.type = "module"; // Set the project to use ES Modules

  packageJson.scripts = {
    ...packageJson.scripts,
    dev: "nodemon src/index.js", // Add this line for dev script
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Step 4: Setup Folder Structure
  console.log("📁 Creating project structure...");

  // Create necessary directories
  fs.mkdirSync(path.join(projectPath, "src"));
  fs.mkdirSync(path.join(projectPath, "src", "controllers"));
  fs.mkdirSync(path.join(projectPath, "src", "models"));
  fs.mkdirSync(path.join(projectPath, "src", "routes"));
  fs.mkdirSync(path.join(projectPath, "src", "middlewares"));
  fs.mkdirSync(path.join(projectPath, "src", "config"));

  // Step 5: Write environment configuration
  const envContent = `
PORT=3000
JWT_SECRET=your_jwt_secret
`;

  fs.writeFileSync(path.join(projectPath, ".env"), envContent.trim());

  // Step 6: Write basic project files

  // src/index.js (updated to reflect src folder)
  const indexContent = `
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Basic route for health check
app.get('/', (req, res) => res.send('Hello from ${projectName} backend!'));

// Use Routes
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('🚀 Server running on ' + 'http://localhost:' + port));
`;

  fs.writeFileSync(
    path.join(projectPath, "src", "index.js"),
    indexContent.trim()
  );

  // Create controllers, routes, and models for an example user API

  const userController = `
export const getUsers = (req, res) => {
  res.json({ message: "List of users" });
};
`;

  fs.writeFileSync(
    path.join(projectPath, "src", "controllers", "userController.js"),
    userController.trim()
  );

  const userRoutes = `
import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);

export default router;
`;

  fs.writeFileSync(
    path.join(projectPath, "src", "routes", "userRoutes.js"),
    userRoutes.trim()
  );

  // Step 7: Optionally Add Auth (JWT)
  if (useAuth.toLowerCase() === "yes") {
    const authMiddleware = `
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
`;

    fs.writeFileSync(
      path.join(projectPath, "src", "middlewares", "authMiddleware.js"),
      authMiddleware.trim()
    );
  }

  console.log(`👉 Project "${projectName}" created!`);
  console.log(`👉 Run: cd ${projectName} && npm run dev`);
}

main();
