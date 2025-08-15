import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { logInfo } from "../utils/logger.js";

export async function configureMulter(language: string, packageManager: 'npm' | 'pnpm'): Promise<void> {
  try {
    logInfo("📦 Setting up Multer...");
    // Note: multer and @types/multer dependencies are now installed in installDependencies function

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