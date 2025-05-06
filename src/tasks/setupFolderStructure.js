import { createMultipleDirectories, createDirectory } from "../utils/fileSystem.js";
import path from "path";
import { logWarning } from "../utils/logger.js";

export async function setupFolderStructure(projectName) {
    logWarning("📁 Creating project folders...");

    const base = path.join(process.cwd(), "src");

    // Ensure base 'src' folder exists
    await createDirectory(base);

    await createMultipleDirectories([
        path.join(base, "controllers"),
        path.join(base, "models"),
        path.join(base, "routes"),
        path.join(base, "middlewares"),
        path.join(base, "config"),
    ]);
}
