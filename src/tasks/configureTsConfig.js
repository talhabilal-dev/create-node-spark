import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { logSuccess } from "../utils/logger.js";

export async function configureTsConfig(projectName) {
    try {
        const tsConfigPath = path.join(process.cwd(), "tsconfig.json");

        const tsConfigContent = {

            "compilerOptions": {
                "target": "ES2020",
                "module": "ESNext",
                "moduleResolution": "Node",
                "outDir": "./dist",
                "rootDir": "./src",
                "strict": true,
                "esModuleInterop": true,
                "skipLibCheck": true,
                "forceConsistentCasingInFileNames": true
            },
            "include": ["src"],
            "exclude": ["node_modules", "dist"]
        }




        await writeFile(
            tsConfigPath,
            tsConfigContent,
            "utf-8"
        );

        logSuccess(`✅ tsconfig.json has been set up for ${projectName}`);
    } catch (err) {

        logError("❌ Failed to configure tsconfig.json:", err);
    }
}
