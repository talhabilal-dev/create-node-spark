import { createMultipleDirectories, createDirectory } from "../utils/fileSystem.js";
import path from "path";
import { logWarning } from "../utils/logger.js";

export async function setupFolderStructure(projectName) {
    logWarning("📁 Creating project folders...");

    const base = path.join(process.cwd(), "src");
    const publicFolder = path.join(process.cwd(), "public");

    // Ensure base 'src' folder exists
    await createDirectory(base);

    // Create subfolders in 'src'
    await createMultipleDirectories([
        path.join(base, "controllers"),
        path.join(base, "models"),
        path.join(base, "routes"),
        path.join(base, "middlewares"),
        path.join(base, "services"),
        path.join(base, "utils"),
        path.join(base, "config"),
    ]);

    // Ensure 'public' folder exists outside 'src'
    await createDirectory(publicFolder);

    // (Optional) Create some typical subfolders inside 'public'
    await createMultipleDirectories([
        path.join(publicFolder, "images"),
        path.join(publicFolder, "temp"),
        path.join(publicFolder, "css"),
        path.join(publicFolder, "js"),
    ]);

    logWarning("✅ Project folder structure created successfully!");
}
