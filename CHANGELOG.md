# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.6.0] - 2025-08-14

### 🚀 Added

- **CLI Flags System**
  - Project configuration: `--name`, `--lang`, `--framework`, `--db`, `--pm`
  - Feature flags: `--eslint`, `--multer`, `--no-eslint`, `--no-multer`
  - Utility flags: `--yes` (skip prompts), `--verbose`, `--silent`
  - Help & version: `--help`, `--version` with comprehensive docs
  - Hybrid mode: mix flags with prompts; prompts only for missing values
  - Automation-ready: full CI/CD scripting support
  - Flag validation: detailed error messages for invalid combinations
  - Modern CLI experience: flag patterns similar to Create React App/Vite

- **PostgreSQL + Prisma Integration**
  - Full PostgreSQL support with Prisma ORM
  - Pre-configured `prisma/schema.prisma` with User and Post models
  - Service layer with CRUD operations
  - API controllers and route integration for PostgreSQL projects
  - Environment configuration: `DATABASE_URL` support
  - CLI: `--db postgresql` and `--db postgres` flags, interactive prompt option
  - Automatic installation of Prisma & @prisma/client
  - TypeScript support with Prisma-generated types
  - Optimized connection management (singleton pattern)

### 🛠 Changed

- Enhanced prompts to work with partial flag-based configuration
- Flexible configuration: combine flags and prompts seamlessly
- Smart defaults with `--yes` flag for missing values
- Improved error handling for invalid flag combinations
- Modified `setupEnv` to generate DB-specific environment configs
- .env files now only include variables for selected DB

### ✨ Improved

- Environment variables generated only for chosen DB (MongoDB, MySQL, PostgreSQL, or none)
- Cleaner, more focused environment configuration management
- Tailored database setup for each DB option

### 🏆 Enhanced

- Database options: now supports MongoDB, MySQL, PostgreSQL
- Expanded project structure for PostgreSQL
- Updated documentation with PostgreSQL examples
- Improved help output to include all DB options

---

## 🧑‍💻 Usage Examples

```bash
# PostgreSQL + Prisma with TypeScript
npx create-node-spark my-api --lang ts --framework express --db postgresql --yes

# Interactive PostgreSQL selection
npx create-node-spark my-api --lang typescript --framework express
# Select PostgreSQL + Prisma from the menu

# MongoDB automation
npx create-node-spark my-api --lang ts --framework express --db mongodb --eslint --yes

# Quick setup with package manager
npx create-node-spark my-api --pm pnpm --yes
```

---

## 📁 Files Generated for PostgreSQL Projects

- `prisma/schema.prisma` — Prisma database schema with example models
- `src/config/db.config.ts` — Prisma client configuration
- `src/services/user.service.ts` — User CRUD service
- `src/controllers/user.controller.ts` — API controllers
- `src/routes/user.routes.ts` — Express user routes
- `.env` — Includes `DATABASE_URL` for PostgreSQL
- `src/index.ts` — Prisma connection & routes integration

---

## [2.5.0] - 2025-08-1 to 2025-08-14

### Added

- **Package Manager Selection**: Users can now choose between npm and pnpm during project initialization
- **Directory Existence Check**: Automatically checks if project directory already exists before creation to prevent overwrites
- **Enhanced Project Setup Flow**: Improved prompts and validation during project scaffolding

### Changed

- **Dependency Installation**: All package installations now respect the user's chosen package manager (npm or pnpm)
- **Script Generation**: Generated package.json scripts now use the appropriate package manager commands
- **Setup Tasks**: All setup tasks (ESLint, Multer, Database) now use the selected package manager consistently

## [2.4.1] - 2025-08-13

### Added

- **Developer-Friendly ESLint Configuration**: Balanced ESLint setup for solo developers and small teams
- **TypeScript-Specific Linting**: Added `typescript-eslint` with reasonable type safety rules
- **Code Quality Rules**: Essential rules for code consistency without being overwhelming
- **Prettier Integration**: Added `.prettierrc` configuration for consistent code formatting
- **Multiple Lint Scripts**: Added `lint`, `lint:fix`, `lint:check`, `format`, and `format:check` npm scripts
- **Smart Ignore Patterns**: Created comprehensive `.eslintignore` file excluding build outputs, dependencies, and IDE files
- **Test File Configuration**: Special ESLint rules for test files with relaxed restrictions

### Changed

- **From Strict to Practical** – Started with strict rules, then softened them for better DX while keeping quality safeguards.
- **TypeScript Support Upgrade** – Moved from JS-only linting to full TypeScript linting with type information.
- **Relaxed `any` Usage** – Now warns instead of errors on `any` for early development flexibility.
- **Console Logs Allowed** – `console.log` now permitted for debugging.
- **Formatting Rules Downgraded** – Most formatting rules changed from errors to warnings.
- **Security Plugins Removed** – Dropped heavy security plugins to reduce complexity for small teams.
- **Promise Rules Adjusted** – Loosened some async handling rules for real-world workflows.

## Fixed

- **Type-Aware ESLint Errors** – Resolved parser issues so ESLint understands TypeScript syntax and types.
- **File Targeting** – Lint commands now focus on `src/` and skip compiled output (`dist/`).
- **Plugin Compatibility** – Fixed conflicts between ESLint core, TypeScript ESLint plugin, and Node/Promise plugins.

## [2.4.0] - 2025-08-12

### Changed

- **Major TypeScript Migration**: Complete conversion from JavaScript to TypeScript
- Enhanced type safety with comprehensive type definitions and interfaces
- Improved error handling with proper TypeScript error types
- Updated build system to compile TypeScript to JavaScript output in `dist/` folder
- Enhanced code quality with strict TypeScript compiler settings

### Added

- Created `types/index.ts` with project-wide type definitions (`ProjectDetails`, `DependencyConfig`)
- Enhanced `tsconfig.json` with production-ready TypeScript configuration
- New npm scripts: `clean`, `prepublishOnly`, and improved `start` script
- Source maps and declaration files for better debugging experience
- Comprehensive type annotations across all utility functions and tasks
- **Interactive CLI Experience**: Beautiful ASCII art logo and enhanced terminal interface
- **Enhanced Color Scheme**: 16+ color combinations with bright, professional styling
- **Visual Feedback System**: Progress tracking, step indicators, and icon-based status updates
- **Professional Branding**: Eye-catching NODE SPARK banner with decorative borders
- **User Experience Improvements**: Screen clearing, interactive prompts, and completion celebration

### Fixed

- Resolved all TypeScript compilation errors
- Fixed async/await usage in file system operations
- Improved error handling in CLI prompts and task execution
- Corrected exec command calls to remove invalid stdio options

## [2.3.0] - 2025-05-10

### Added

- MySQL database support with full integration
- `knex` and `mysql2` packages for MySQL connection and query management
- Database selection between MongoDB, MySQL, or no database

### Changed

- Updated database connection handling to support multiple database types
- Improved database configuration management

### Fixed

- Minor bug fixes related to database connection handling

## [2.2.0] - 2025-05-09

### Added

- Multiple file upload support with Multer integration
- Enhanced public folder structure with organized directories:
  - `/public/images`
  - `/public/css`
  - `/public/js`
  - `/public/temp`
- New `/services` folder in `/src` for business logic separation
- New `/utils` folder in `/src` for utility functions

### Improved

- Cleaned up and enhanced overall folder structure for better scalability
- Improved code organization and maintainability

## [2.1.0] - 2025-05-08

### Added

- Database selection option during project scaffolding
- Smart database bootstrapping with connection-dependent server startup
- Dedicated environment configuration file (`config/env.config.js`)

### Changed

- Server startup logic now waits for successful database connection when database is selected
- Improved environment variable organization and management

### Fixed

- Minor code cleanups and internal improvements

## [2.0.0] - 2025-05-06

### Added

- **TypeScript support**: Choose between JavaScript or TypeScript for project scaffolding
- "None" framework option using native Node.js `http` module for basic server setup
- Improved CLI prompts with enhanced terminal UI

### Changed

- **Breaking**: Removed built-in authentication and Multer installation for cleaner, unopinionated scaffolding
- Maintained detailed folder structure from version 1.1.0
- Enhanced user experience with better prompts and options

### Improved

- Focused on clean, minimal scaffolding approach
- Better separation of concerns in generated projects

## [1.1.0] - 2025-05-04

### Added

- ESLint integration option for code quality enforcement
- Comprehensive folder structure:
  - `src/controllers` - Request handlers
  - `src/models` - Data models
  - `src/routes` - API routes
  - `src/middlewares` - Custom middleware
  - `src/utils` - Utility functions
  - `src/config` - Configuration files

### Improved

- Better project organization and scalability
- Enhanced development workflow with linting support

## [1.0.1] - 2025-05-03

### Fixed

- Minor bug fixes and stability improvements

## [1.0.0] - 2025-05-03

### Added

- Initial release of create-node-spark
- JavaScript project scaffolding support
- Express server setup with basic configuration
- Built-in authentication setup
- Multer integration for file uploads
- Basic project structure generation

### Features

- Command-line interface for interactive project creation
- Automated dependency installation
- Ready-to-use Express application template
