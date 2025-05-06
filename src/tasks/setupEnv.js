import { writeFile } from "../utils/fileSystem.js";
import path from "path";

export async function setupEnv(projectName) {
    const envContent = `
PORT=3000
JWT_SECRET=your_jwt_secret

`;

    const envPath = path.join(process.cwd(), ".env");

    writeFile(envPath, envContent.trim(), "utf-8");
}
