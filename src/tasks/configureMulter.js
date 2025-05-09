import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { exec } from "child_process";
import { logInfo } from "../utils/logger.js";
import { promisify } from "util";
const execPromise = promisify(exec);
export async function configureMulter(language) {
    try {

        logInfo("📦 Setting up Multer...");
        await execPromise("npm install multer", { stdio: "ignore" });

        if (language === "TypeScript") {
            logInfo("📦 Setting up Multer Types...");
            await execPromise("npm install @types/multer", { stdio: "ignore" });
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

        throw new error;

    }

}