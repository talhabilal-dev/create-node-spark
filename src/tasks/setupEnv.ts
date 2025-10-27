import { writeFile } from "../utils/fileSystem.js";
import path from "path";


export async function setupEnv(projectName: string, language: string, database?: string): Promise<void> {
    try {

        const extension = language === "TypeScript" ? "ts" : "js";

        // Base environment variables
        let envContent = `PORT=3000\n`;

        // Add database-specific environment variables
        if (database === 'MongoDB') {
            envContent += `MONGO_URI=mongodb+srv://<username>:<password>@cluster0.m8oca.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Cluster0\n`;
        } else if (database === 'MySQL') {
            envContent += `MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=your_database_name
MYSQL_USER=root
MYSQL_PASSWORD=your_password\n`;
        } else if (database === 'PostgreSQL') {
            envContent += `# PostgreSQL Connection String
# Format: postgresql://username:password@localhost:5432/database_name
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"\n`;
        }

        const envPath = path.join(process.cwd(), ".env");

        await writeFile(envPath, envContent.trim(), "utf-8");


        const configEnvPath = path.join(process.cwd(), "src", "config", `env.config.${extension}`);

        // Create environment config based on selected database
        let envConfigObject = `  PORT: process.env.PORT || 3000,\n`;

        if (database === 'MongoDB') {
            envConfigObject += `  MONGO_URI: process.env.MONGO_URI,\n`;
        } else if (database === 'MySQL') {
            envConfigObject += `  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,\n`;
        } else if (database === 'PostgreSQL') {
            envConfigObject += `  DATABASE_URL: process.env.DATABASE_URL,\n`;
        }

        const configEnvContent = language === "TypeScript" ? `
        import dotenv from "dotenv";
        
        dotenv.config();

        interface EnvironmentConfig {
            PORT: number | string;
            MONGO_URI?: string;
            MYSQL_HOST?: string;
            MYSQL_PORT?: number | string;
            MYSQL_DATABASE?: string;
            MYSQL_USER?: string;
            MYSQL_PASSWORD?: string;
            DATABASE_URL?: string;
        }

        const ENV: EnvironmentConfig = {
${envConfigObject}};

export default ENV;

        `:
            `
        import dotenv from "dotenv";
        
        dotenv.config();

        const ENV = {
${envConfigObject}};

export default ENV;

        `;

        await writeFile(configEnvPath, configEnvContent.trim(), "utf-8");

    }


    catch (error) {

        throw error;

    }

}