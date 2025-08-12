#!/usr/bin/env node
import initializeProject from "../commands/init.js";
import { logSuccess, logError, logBanner, logProjectComplete } from "../utils/logger.js";

// Show the banner when CLI starts
logBanner();

try {
    const projectName = await initializeProject();

    logProjectComplete(projectName);
} catch (error: any) {
    logError(error);
    process.exit(1);
}