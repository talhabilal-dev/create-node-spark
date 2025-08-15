import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProjectDetails } from "../types/index.js";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface CliFlags {
    // Project configuration
    name?: string;
    language?: 'JavaScript' | 'TypeScript';
    framework?: 'Express' | 'Fastify' | 'none';
    database?: 'MongoDB' | 'MySQL' | 'PostgreSQL' | 'none';
    packageManager?: 'npm' | 'pnpm';    // Features
    eslint?: boolean;
    multer?: boolean;

    // Utility flags
    help?: boolean;
    version?: boolean;
    yes?: boolean; // Skip prompts and use defaults
    verbose?: boolean;
    silent?: boolean;
    template?: string; // Future feature for templates
}

export interface ParsedArgs {
    flags: CliFlags;
    positionalArgs: string[];
    shouldShowHelp: boolean;
    shouldShowVersion: boolean;
    hasProjectConfig: boolean;
}

export function parseCliArgs(args: string[]): ParsedArgs {
    const flags: CliFlags = {};
    const positionalArgs: string[] = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const nextArg = args[i + 1];

        switch (arg) {
            // Help flags
            case '-h':
            case '--help':
                flags.help = true;
                break;

            // Version flags
            case '-v':
            case '--version':
                flags.version = true;
                break;

            // Project name (can be positional or flag)
            case '-n':
            case '--name':
                if (nextArg && !nextArg.startsWith('-')) {
                    flags.name = nextArg;
                    i++; // Skip next arg as it's consumed
                }
                break;

            // Language selection
            case '-l':
            case '--language':
            case '--lang':
                if (nextArg && (nextArg.toLowerCase() === 'javascript' || nextArg.toLowerCase() === 'js')) {
                    flags.language = 'JavaScript';
                    i++;
                } else if (nextArg && (nextArg.toLowerCase() === 'typescript' || nextArg.toLowerCase() === 'ts')) {
                    flags.language = 'TypeScript';
                    i++;
                }
                break;

            // Framework selection
            case '-f':
            case '--framework':
                if (nextArg && nextArg.toLowerCase() === 'express') {
                    flags.framework = 'Express';
                    i++;
                } else if (nextArg && nextArg.toLowerCase() === 'fastify') {
                    flags.framework = 'Fastify';
                    i++;
                } else if (nextArg && nextArg.toLowerCase() === 'none') {
                    flags.framework = 'none';
                    i++;
                }
                break;

            // Database selection
            case '-d':
            case '--database':
            case '--db':
                if (nextArg && nextArg.toLowerCase() === 'mongodb') {
                    flags.database = 'MongoDB';
                    i++;
                } else if (nextArg && nextArg.toLowerCase() === 'mysql') {
                    flags.database = 'MySQL';
                    i++;
                } else if (nextArg && (nextArg.toLowerCase() === 'postgresql' || nextArg.toLowerCase() === 'postgres')) {
                    flags.database = 'PostgreSQL';
                    i++;
                } else if (nextArg && nextArg.toLowerCase() === 'none') {
                    flags.database = 'none';
                    i++;
                }
                break;

            // Package manager
            case '-p':
            case '--package-manager':
            case '--pm':
                if (nextArg && (nextArg === 'npm' || nextArg === 'pnpm')) {
                    flags.packageManager = nextArg as 'npm' | 'pnpm';
                    i++;
                }
                break;

            // Feature flags
            case '--eslint':
                flags.eslint = true;
                break;
            case '--no-eslint':
                flags.eslint = false;
                break;
            case '--multer':
                flags.multer = true;
                break;
            case '--no-multer':
                flags.multer = false;
                break;

            // Utility flags
            case '-y':
            case '--yes':
                flags.yes = true;
                break;
            case '--verbose':
                flags.verbose = true;
                break;
            case '--silent':
                flags.silent = true;
                break;
            case '-t':
            case '--template':
                if (nextArg && !nextArg.startsWith('-')) {
                    flags.template = nextArg;
                    i++;
                }
                break;

            // Positional arguments
            default:
                if (!arg.startsWith('-')) {
                    positionalArgs.push(arg);
                }
                break;
        }
    }

    // If first positional arg exists and no name flag, use it as project name
    if (positionalArgs.length > 0 && !flags.name) {
        flags.name = positionalArgs[0];
    }

    return {
        flags,
        positionalArgs,
        shouldShowHelp: flags.help === true,
        shouldShowVersion: flags.version === true,
        hasProjectConfig: !!(flags.name || flags.language || flags.framework || flags.database),
    };
}

export function createProjectDetailsFromFlags(flags: CliFlags): Partial<ProjectDetails> {
    const features: ('eslint' | 'multer')[] = [];

    if (flags.eslint === true) features.push('eslint');
    if (flags.multer === true) features.push('multer');

    return {
        projectName: flags.name,
        language: flags.language,
        framework: flags.framework,
        database: flags.database,
        packageManager: flags.packageManager,
        features,
    };
}

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m'
};

function colorize(text: string, color: string): string {
    return `${color}${text}${colors.reset}`;
}

export function showHelp(): void {
    console.log(`
${colorize('🚀 create-node-spark', colors.cyan + colors.bright)} - Scaffold production-ready Node.js backends

${colorize('Usage:', colors.yellow + colors.bright)}
  ${colorize('npx create-node-spark', colors.green)} ${colorize('[project-name]', colors.blue)} ${colorize('[options]', colors.magenta)}
  ${colorize('create-node-spark', colors.green)} ${colorize('[project-name]', colors.blue)} ${colorize('[options]', colors.magenta)}

${colorize('Arguments:', colors.yellow + colors.bright)}
  ${colorize('project-name', colors.blue)}              Name of the project to create

${colorize('Options:', colors.yellow + colors.bright)}
  ${colorize('Configuration:', colors.cyan)}
    ${colorize('--name', colors.green)} ${colorize('<name>', colors.blue)}           Project name (same as positional argument)
    ${colorize('--lang', colors.green)} ${colorize('<language>', colors.blue)}       Language: ${colorize('javascript', colors.white)}, ${colorize('js', colors.white)}, ${colorize('typescript', colors.white)}, ${colorize('ts', colors.white)}
    ${colorize('--framework', colors.green)} ${colorize('<fw>', colors.blue)}        Framework: ${colorize('express', colors.white)}, ${colorize('fastify', colors.white)}, ${colorize('none', colors.white)}
    ${colorize('--db', colors.green)} ${colorize('<database>', colors.blue)}         Database: ${colorize('mongodb', colors.white)}, ${colorize('mongo', colors.white)}, ${colorize('mysql', colors.white)}, ${colorize('postgresql', colors.white)}, ${colorize('postgres', colors.white)}, ${colorize('none', colors.white)}
    ${colorize('--pm', colors.green)} ${colorize('<manager>', colors.blue)}          Package manager: ${colorize('npm', colors.white)}, ${colorize('pnpm', colors.white)}

  ${colorize('Features:', colors.cyan)}
    ${colorize('--eslint', colors.green)}               Enable ESLint configuration
    ${colorize('--no-eslint', colors.red)}            Disable ESLint configuration
    ${colorize('--multer', colors.green)}               Enable Multer for file uploads
    ${colorize('--no-multer', colors.red)}            Disable Multer

  ${colorize('Automation:', colors.cyan)}
    ${colorize('--yes', colors.green)}, ${colorize('-y', colors.green)}              Skip all prompts and use defaults
    ${colorize('--verbose', colors.green)}              Show detailed output
    ${colorize('--silent', colors.green)}               Suppress non-error output

  ${colorize('Information:', colors.cyan)}
    ${colorize('--help', colors.green)}, ${colorize('-h', colors.green)}             Show this help message
    ${colorize('--version', colors.green)}, ${colorize('-v', colors.green)}          Show version number

${colorize('Examples:', colors.yellow + colors.bright)}
  ${colorize('# Interactive mode (default)', colors.gray)}
  ${colorize('npx create-node-spark', colors.green)}

  ${colorize('# Full automation', colors.gray)}
  ${colorize('npx create-node-spark my-api', colors.green)} ${colorize('--lang ts --framework express --db mongodb --eslint --yes', colors.magenta)}

  ${colorize('# Fastify + TypeScript setup', colors.gray)}
  ${colorize('npx create-node-spark my-api', colors.green)} ${colorize('--lang ts --framework fastify --db postgresql --yes', colors.magenta)}

  ${colorize('# Partial configuration with prompts', colors.gray)}
  ${colorize('npx create-node-spark my-api', colors.green)} ${colorize('--lang typescript --framework express', colors.magenta)}

  ${colorize('# Quick setup with package manager', colors.gray)}
  ${colorize('npx create-node-spark my-api', colors.green)} ${colorize('--pm pnpm --yes', colors.magenta)}

  ${colorize('# PostgreSQL + Prisma setup', colors.gray)}
  ${colorize('npx create-node-spark my-api', colors.green)} ${colorize('--lang ts --framework express --db postgresql --yes', colors.magenta)}

  ${colorize('# Silent mode for CI/CD', colors.gray)}
  ${colorize('npx create-node-spark my-api', colors.green)} ${colorize('--lang js --framework express --db none --yes --silent', colors.magenta)}

${colorize('For more information, visit:', colors.yellow)} ${colorize('https://github.com/talhabilal-dev/create-node-spark', colors.blue + colors.bright)}
  `);
}

export function showVersion(): void {
    // Read version from package.json
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));
    console.log(`${colorize('🚀 create-node-spark', colors.cyan + colors.bright)} ${colorize('v' + packageJson.version, colors.green + colors.bright)}`);
}

export function validateFlags(flags: CliFlags): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate language
    if (flags.language && !['JavaScript', 'TypeScript'].includes(flags.language)) {
        errors.push(`Invalid language: ${flags.language}. Use 'javascript' or 'typescript'`);
    }

    // Validate framework
    if (flags.framework && !['Express', 'Fastify', 'none'].includes(flags.framework)) {
        errors.push(`Invalid framework: ${flags.framework}. Use 'express', 'fastify', or 'none'`);
    }

    // Validate database
    if (flags.database && !['MongoDB', 'MySQL', 'PostgreSQL', 'none'].includes(flags.database)) {
        errors.push(`Invalid database: ${flags.database}. Use 'mongodb', 'mysql', 'postgresql', or 'none'`);
    }

    // Validate package manager
    if (flags.packageManager && !['npm', 'pnpm'].includes(flags.packageManager)) {
        errors.push(`Invalid package manager: ${flags.packageManager}. Use 'npm' or 'pnpm'`);
    }

    // Validate project name
    if (flags.name && !/^[a-zA-Z0-9-_]+$/.test(flags.name)) {
        errors.push(`Invalid project name: ${flags.name}. Use only letters, numbers, hyphens, and underscores`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
