import { writeFile } from "../utils/fileSystem.js";
import path from "path";

export async function setupEnv(projectName, language) {
    try {

        const extension = language === "TypeScript" ? "ts" : "js";

        const envContent = `
        PORT=3000   
        `;

        const envPath = path.join(process.cwd(), ".env");

        writeFile(envPath, envContent.trim(), "utf-8")


        const configEnvPath = path.join(process.cwd(), "src", "config", `env.config.${extension}`);

        const configEnvContent = `
        import dotenv from "dotenv";
        
        dotenv.config();

        const ENV = {
  PORT: process.env.PORT || 3000,
};

export default ENV;

        `;

        writeFile(configEnvPath, configEnvContent.trim(), "utf-8")

    }


    catch (error) {

        throw new error;

    }

}