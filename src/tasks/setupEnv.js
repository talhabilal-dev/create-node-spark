import fs from "fs";
import path from "path";

export async function setupEnv(projectName) {
  const envContent = `
PORT=3000
JWT_SECRET=your_jwt_secret
`;
  fs.writeFileSync(path.join(process.cwd(), ".env"), envContent.trim());
}
