function log(message) {
  console.log(message);
}

// Success message (green)
function logSuccess(message) {
  console.log(`\x1b[32m${message}\x1b[0m`);
}

// Warning message (yellow)
function logWarning(message) {
  console.log(`\x1b[33m${message}\x1b[0m`);
}

// Error message (red)
function logError(message) {
  console.error(`\x1b[31m${message}\x1b[0m`);
}

// Info message (blue)
function logInfo(message) {
  console.log(`\x1b[36m${message}\x1b[0m`);
}

export { log, logSuccess, logWarning, logError, logInfo };
