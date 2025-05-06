import path from "path";
import { logError, logSuccess } from "../utils/logger.js";
import { writeFile, readFile } from "../utils/fileSystem.js";

export async function configurePackageJson(projectName, language) {
    try {
        const packageJsonPath = path.join(process.cwd(), "package.json");
        const rawPackageJson = await readFile(packageJsonPath, "utf-8");

        const packageJson = JSON.parse(rawPackageJson);

        // Ensure ESM
        packageJson.type = "module";

        const isTS = language === "TypeScript";

        // Dev script
        const devScript = isTS ? "tsx src/index.ts" : "nodemon src/index.js";

        // Start script
        const startScript = isTS ? "node dist/index.js" : "node src/index.js";

        // Build script (only for TS)
        if (isTS) {
            packageJson.scripts = {
                ...packageJson.scripts,
                build: "tsc"
            };
        }

        // Add or update scripts
        packageJson.scripts = {
            ...packageJson.scripts,
            dev: devScript,
            start: startScript
        };

        // Write back updated package.json with pretty format
        await writeFile(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2),
            "utf-8"
        );

        logSuccess('✅ package.json updated: set scripts and module type');
    } catch (error) {
        logError(`❌ Failed to configure package.json: ${error.message}`);
        throw error;
    }
}
