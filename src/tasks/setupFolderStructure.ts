import { createMultipleDirectories, createDirectory } from "../utils/fileSystem.js";
import path from "path";
import { logProgress, logCreatingFolder, colors } from "../utils/logger.js";

export async function setupFolderStructure(projectName: string): Promise<void> {
    logProgress(`${colors.brightYellow}📁 Creating project folder structure...${colors.reset}`);

    const base = path.join(process.cwd(), "src");
    const publicFolder = path.join(process.cwd(), "public");

    // Ensure base 'src' folder exists
    logCreatingFolder("src");
    await createDirectory(base);

    // Create subfolders in 'src'
    const srcFolders = [
        "controllers",
        "models",
        "routes",
        "middlewares",
        "services"
    ];

    for (const folder of srcFolders) {
        logCreatingFolder(`src/${folder}`);
    }

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
    logCreatingFolder("public");
    await createDirectory(publicFolder);

    // Create typical subfolders inside 'public'
    const publicFolders = ["images", "temp", "css", "js"];
    for (const folder of publicFolders) {
        logCreatingFolder(`public/${folder}`);
    }

    await createMultipleDirectories([
        path.join(publicFolder, "images"),
        path.join(publicFolder, "temp"),
        path.join(publicFolder, "css"),
        path.join(publicFolder, "js"),
    ]);
}
