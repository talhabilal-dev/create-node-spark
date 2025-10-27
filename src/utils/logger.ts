// ANSI Color Codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',

    // Foreground colors
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    // Bright foreground colors
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
    brightWhite: '\x1b[97m',

    // Background colors
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m'
};

// Logger configuration
let silentMode = false;

function setSilentMode(silent: boolean): void {
    silentMode = silent;
}

function isSilent(): boolean {
    return silentMode;
}

// ASCII Art for the CLI
const asciiArt = {
    logo: `
${colors.brightCyan}
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║    ███╗   ██╗ ██████╗ ██████╗ ███████╗    ███████╗██████╗     ║
║    ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ██╔════╝██╔══██╗    ║
║    ██╔██╗ ██║██║   ██║██║  ██║█████╗      ███████╗██████╔╝    ║
║    ██║╚██╗██║██║   ██║██║  ██║██╔══╝      ╚════██║██╔═══╝     ║
║    ██║ ╚████║╚██████╔╝██████╔╝███████╗    ███████║██║         ║
║    ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚══════╝╚═╝         ║
║                                                               ║
║           ${colors.brightYellow}🚀 Create Node.js backends in seconds! 🚀${colors.brightCyan}           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
${colors.reset}`,


    checkmark: `${colors.brightGreen}✅${colors.reset}`,
    crossmark: `${colors.brightRed}❌${colors.reset}`,
    info: `${colors.brightBlue}ℹ️${colors.reset}`,
    warning: `${colors.brightYellow}⚠️${colors.reset}`,
    gear: `${colors.brightCyan}⚙️${colors.reset}`,
    package: `${colors.brightMagenta}📦${colors.reset}`,
    folder: `${colors.brightYellow}📁${colors.reset}`,
    database: `${colors.brightGreen}🗄️${colors.reset}`,
    fire: `${colors.brightRed}🔥${colors.reset}`
};

// Enhanced logging functions
function log(message: string): void {
    if (silentMode) return;
    console.log(message);
}

function logBanner(): void {
    if (silentMode) return;
    console.clear();
    console.log(asciiArt.logo);
    console.log();
}

function logSuccess(message: string, withIcon: boolean = true): void {
    if (silentMode) return;
    const icon = withIcon ? `${asciiArt.checkmark} ` : '';
    console.log(`${colors.brightGreen}${icon}${message}${colors.reset}`);
}

function logError(message: string | Error, withIcon: boolean = true): void {
    // Always show errors, even in silent mode
    const errorMessage = message instanceof Error ? message.message : message;
    const icon = withIcon ? `${asciiArt.crossmark} ` : '';
    console.error(`${colors.brightRed}${icon}${errorMessage}${colors.reset}`);
}

function logWarning(message: string, withIcon: boolean = true): void {
    if (silentMode) return;
    const icon = withIcon ? `${asciiArt.warning} ` : '';
    console.log(`${colors.brightYellow}${icon}${message}${colors.reset}`);
}

function logInfo(message: string, withIcon: boolean = true): void {
    if (silentMode) return;
    const icon = withIcon ? `${asciiArt.info} ` : '';
    console.log(`${colors.brightCyan}${icon}${message}${colors.reset}`);
}

function logStep(step: number, total: number, message: string): void {
    if (silentMode) return;
    const progress = `${colors.dim}[${step}/${total}]${colors.reset}`;
    console.log(`${progress} ${colors.brightMagenta}${message}${colors.reset}`);
}

function logSeparator(): void {
    if (silentMode) return;
    console.log(`${colors.dim}${'─'.repeat(65)}${colors.reset}`);
}

function logHeader(title: string): void {
    if (silentMode) return;
    console.log();
    console.log(`${colors.bright}${colors.brightCyan}▓▓▓ ${title.toUpperCase()} ▓▓▓${colors.reset}`);
    logSeparator();
}

function logProgress(message: string, icon: string = asciiArt.gear): void {
    if (silentMode) return;
    console.log(`${icon} ${colors.brightBlue}${message}${colors.reset}`);
}

function logFeature(feature: string, enabled: boolean = true): void {
    if (silentMode) return;
    const status = enabled ? asciiArt.checkmark : asciiArt.crossmark;
    const color = enabled ? colors.brightGreen : colors.dim;
    console.log(`  ${status} ${color}${feature}${colors.reset}`);
}

function logProjectComplete(projectName: string): void {
    if (silentMode) return;
    console.log();
    console.log(`${colors.brightGreen}╔═══════════════════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.bright}${colors.brightWhite}PROJECT CREATED SUCCESSFULLY!${colors.reset}${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.brightYellow}Project: ${colors.brightWhite}${projectName}${colors.reset}${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.brightCyan}Next steps:${colors.reset}${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.dim}1.${colors.reset} ${colors.brightWhite}cd ${projectName}${colors.reset}${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.dim}2.${colors.reset} ${colors.brightWhite}npm run dev${colors.reset}${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}  ${colors.dim}3.${colors.reset} ${colors.brightWhite}Start building amazing things!${colors.reset}${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}║${colors.reset}                 ${colors.brightGreen}${colors.reset}`);
    console.log(`${colors.brightGreen}╚═══════════════════════════════════════════════════════════════╝${colors.reset}`);
    console.log();
    console.log(`${colors.brightMagenta}${asciiArt.fire} Happy coding! ${asciiArt.fire}${colors.reset}`);
    console.log();
}

function logInstalling(packageName: string): void {
    if (silentMode) return;
    console.log(`${asciiArt.package} ${colors.brightBlue}Installing ${colors.brightWhite}${packageName}${colors.brightBlue}...${colors.reset}`);
}

function logCreatingFolder(folderName: string): void {
    if (silentMode) return;
    console.log(`${asciiArt.folder} ${colors.brightYellow}Creating folder: ${colors.brightWhite}${folderName}${colors.reset}`);
}

function logDatabaseSetup(dbType: string): void {
    if (silentMode) return;
    console.log(`${asciiArt.database} ${colors.brightGreen}Setting up ${colors.brightWhite}${dbType}${colors.brightGreen} database...${colors.reset}`);
}

export {
    log,
    logBanner,
    logSuccess,
    logWarning,
    logError,
    logInfo,
    logStep,
    logSeparator,
    logHeader,
    logProgress,
    logFeature,
    logProjectComplete,
    logInstalling,
    logCreatingFolder,
    logDatabaseSetup,
    setSilentMode,
    asciiArt,
    colors
};