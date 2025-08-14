import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { exec } from "child_process";
import { logInfo } from "../utils/logger.js";
import { promisify } from "util";
import { getInstallCommand } from "../utils/packageManager.js";

const execPromise = promisify(exec);

export async function configureMulter(language: string, packageManager: 'npm' | 'pnpm'): Promise<void> {
  try {
    logInfo("📦 Setting up Multer...");
    const multerCmd = getInstallCommand(packageManager, "multer");
    await execPromise(multerCmd);

    if (language === "TypeScript") {
      logInfo("📦 Setting up Multer Types...");
      const typesCmd = getInstallCommand(packageManager, "@types/multer", true);
      await execPromise(typesCmd);
    }



    const extension = language === "TypeScript" ? "ts" : "js";

    const configMulterPath = path.join(process.cwd(), "src", "middlewares", `multer.middleware.${extension}`);

    const configMulterContent = `import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});
`;

    writeFile(configMulterPath, configMulterContent.trim(), "utf-8")

  }


  catch (error) {

    throw error;

  }

}