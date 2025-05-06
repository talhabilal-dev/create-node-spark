#!/usr/bin/env node
import initializeProject from "../commands/init.js";
import { logSuccess, logError } from "../utils/logger.js";

try {
  const projectName = await initializeProject();
  
  logSuccess(`${projectName} created successfully!`);
} catch (error) {
  logError(error);
  process.exit(1);
}
