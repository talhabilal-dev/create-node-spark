import { writeFile } from "../utils/fileSystem.js";
import path from "path";


export async function setupEnv(projectName, language) {
    try {

        const extension = language === "TypeScript" ? "ts" : "js";

        const envContent = `
        PORT=3000
        MONGO_URI=mongodb+srv://<username>::<password>@cluster0.m8oca.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Cluster0
        `;

        const envPath = path.join(process.cwd(), ".env");

        writeFile(envPath, envContent.trim(), "utf-8")


        const configEnvPath = path.join(process.cwd(), "src", "config", `env.config.${extension}`);

        const configEnvContent = language === "TypeScript" ? `
        import dotenv from "dotenv";
        
        dotenv.config();

        const ENV : any = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI
};

export default ENV;

        `:
            `
        import dotenv from "dotenv";
        
        dotenv.config();

        const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI
};

export default ENV;

        `;

        writeFile(configEnvPath, configEnvContent.trim(), "utf-8")

    }


    catch (error) {

        throw new error;

    }

}