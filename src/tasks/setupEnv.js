import fs from "fs";
import path from "path";

export async function setupEnv(projectName) {
  const envContent = `
PORT=3000
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/${projectName}

`;
  fs.writeFileSync(path.join(process.cwd(), ".env"), envContent.trim());
}
