import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { logInfo } from "../utils/logger.js";

export async function setupSql(projectName: string, language: string, packageManager: 'npm' | 'pnpm'): Promise<void> {
  try {
    logInfo("📦 Setting up MySQL...");
    // Note: knex and mysql2 dependencies are now installed in installDependencies function

    const extension = language === "TypeScript" ? "ts" : "js";

    const configDbPath = path.join(process.cwd(), "src", "config", `db.config.${extension}`);

    const configDbContent = language === "TypeScript" ? `import knex, { Knex } from 'knex';;
import ENV from "./env.config";

const connectDB = (): Knex => {
  const db: Knex = knex({
    client: 'mysql2',
    connection: {
      host: ENV.MYSQL_HOST,
      port: ENV.MYSQL_PORT,
      database: ENV.MYSQL_DATABASE,
      user: ENV.MYSQL_USER,
      password: ENV.MYSQL_PASSWORD,
    },
  });
  return db;
};
export default connectDB();
`: `import knex from 'knex';
import ENV from "./env.config.js";

const connectDB = () => {
  const db = knex({
    client: 'mysql2',
    connection: {
      host: ENV.MYSQL_HOST,
      port: ENV.MYSQL_PORT,
      database: ENV.MYSQL_DATABASE,
      user: ENV.MYSQL_USER,
      password: ENV.MYSQL_PASSWORD,
    },
  });
  return db;
};
export default connectDB();
`;

    await writeFile(configDbPath, configDbContent.trim(), "utf-8");

  }


  catch (error) {

    throw error;

  }

}