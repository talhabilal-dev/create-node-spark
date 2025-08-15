#!/usr/bin/env node
import initializeProject from "../commands/init.js";
import { logSuccess, logError, logBanner, logProjectComplete } from "../utils/logger.js";
import { parseCliArgs, showHelp, showVersion, validateFlags, createProjectDetailsFromFlags } from "../utils/cliArgs.js";

// Parse command line arguments
const args = process.argv.slice(2);
const parsedArgs = parseCliArgs(args);

// Handle help flag
if (parsedArgs.shouldShowHelp) {
    showHelp();
    process.exit(0);
}

// Handle version flag
if (parsedArgs.shouldShowVersion) {
    showVersion();
    process.exit(0);
}

// Validate flags
const validation = validateFlags(parsedArgs.flags);
if (!validation.isValid) {
    console.error('❌ Invalid arguments:');
    validation.errors.forEach(error => console.error(`  ${error}`));
    console.error('\nUse --help for usage information.');
    process.exit(1);
}

// Show the banner when CLI starts (unless silent mode)
if (!parsedArgs.flags.silent) {
    logBanner();
}

try {
    // Create project details from flags
    const flagBasedConfig = createProjectDetailsFromFlags(parsedArgs.flags);

    // Initialize project with flag configuration
    const projectName = await initializeProject(flagBasedConfig, parsedArgs.flags);

    if (!parsedArgs.flags.silent) {
        logProjectComplete(projectName);
    }
} catch (error: any) {
    logError(error);
    process.exit(1);
}