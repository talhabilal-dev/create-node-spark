import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { logInfo } from "../utils/logger.js";
import { getInstallCommand } from "../utils/packageManager.js";

const execPromise = promisify(exec);

export async function setupSql(projectName: string, language: string, packageManager: 'npm' | 'pnpm'): Promise<void> {
  try {
    logInfo("📦 Setting up MySQL...");
    const mysqlCmd = getInstallCommand(packageManager, "knex mysql2");
    await execPromise(mysqlCmd);

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

    writeFile(configDbPath, configDbContent.trim(), "utf-8")

  }


  catch (error) {

    throw error;

  }

}