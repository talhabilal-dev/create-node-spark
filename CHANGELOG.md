# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.7.0] - 2026-02-13

### 🚀 Added

- **Docker Containerization Support**
  - Full Docker integration with production-ready multi-stage builds
  - Automatic generation of optimized `Dockerfile` based on language and framework
  - Development `Dockerfile.dev` with hot-reload support
  - Comprehensive `.dockerignore` for optimized image sizes
  - `docker-compose.yml` generation for database integration (MongoDB, MySQL, PostgreSQL)
  - Docker-specific npm/pnpm scripts in package.json:
    - `docker:build` - Build production Docker image
    - `docker:run` - Run production container
    - `docker:dev` - Run development container with volume mounting
    - `docker:up` - Start docker-compose services (when database selected)
    - `docker:down` - Stop docker-compose services
    - `docker:logs` - View container logs
    - `docker:restart` - Restart services
  - Security best practices:
    - Non-root user execution
    - Multi-stage builds for minimal image size
    - Health checks for containers
  - CLI support: `--docker` flag and interactive prompt option
  - Changed color scheme of CLI
  - Works seamlessly with TypeScript/JavaScript, Express/Fastify, and all database options
  - Database containers with health checks and persistent volumes
  - Network isolation and proper service dependencies

### 🛠 Changed

- Updated package.json version to 2.7.0
- Enhanced keywords for better npm discoverability (docker, containerization, etc.)
- Modified project step counting to include Docker setup
- Extended feature selection in interactive prompts

### ✨ Improved

- Better separation of development and production Docker configurations
- Optimized Docker images with layer caching
- Automatic environment variable configuration for containerized databases
- Alpine-based images for smaller footprint
- Volume mounting for development to enable hot-reload

## [2.6.1] - 2025-10-27

### 🐛 Fixed

- **Project Name Validation Consistency**
  - Fixed inconsistency between prompt and CLI flag validation patterns
  - Both now consistently require lowercase letters, numbers, hyphens, and underscores only
  - Updated `cliArgs.ts` validation to match prompt validation rules
  - Prevents confusing validation errors when using different input methods

- **Async File Operations**
  - Added missing `await` keywords to `writeFile` operations in:
    - `setupMongoDb.ts` - Database configuration file creation
    - `setupSql.ts` - MySQL database configuration file creation
    - `setupEnv.ts` - Environment files (.env and env.config) creation
  - Prevents potential race conditions and ensures proper file write completion
  - Improves reliability during project scaffolding

- **TypeScript Type Safety**
  - Replaced `any` type with proper `EnvironmentConfig` interface in env.config files
  - Added comprehensive interface definition with all supported environment variables
  - Generated TypeScript projects now have full type safety for environment configuration
  - Better IDE autocomplete and compile-time error detection
  - Updated both `src/types/index.ts` and `src/tasks/setupEnv.ts`

- **Fastify Route Generation for PostgreSQL**
  - Fixed PostgreSQL + Fastify projects generating Express-style routes
  - Now correctly generates Fastify plugin-based routes with proper typing
  - Added framework parameter to `setupPostgresPrisma` function
  - Fastify routes use async plugin pattern instead of Express Router
  - Properly registers routes in index.ts using `fastify.register()`
  - Updated files: `setupPostgresPrisma.ts`, `init.ts`, `configureIndex.ts`

- **Silent Mode Implementation**
  - Fixed `--silent` flag not suppressing all non-error output
  - Implemented global silent mode configuration in logger utilities
  - Added `setSilentMode()` function to control logger behavior
  - All logger functions now respect silent mode (except errors, which are always shown)
  - Improved CI/CD integration with proper silent execution
  - Updated `logger.ts`, `bin/index.ts`, and `commands/init.ts`

### 📝 Documentation

- Added comprehensive `BUG_FIXES.md` documenting all fixes
- Includes before/after code examples and testing recommendations
- Detailed impact analysis for each bug fix

## [2.6.0]

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

  - **Fastify Framework Support**
  - Full Fastify integration with TypeScript and JavaScript support
  - Fastify-specific server configuration with proper async/await patterns
  - Database integration: MongoDB, MySQL, and PostgreSQL work seamlessly with Fastify
  - API route generation for PostgreSQL projects with Prisma integration
  - Modern Fastify v5+ patterns with logger enabled by default
  - Updated CLI flags: `--framework fastify` support
  - Interactive prompts include Fastify as framework option
  - Comprehensive error handling and JSON response patterns
  - Host binding configuration for containerized deployments

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

## [2.5.0]

### Added

- **Package Manager Selection**: Users can now choose between npm and pnpm during project initialization
- **Directory Existence Check**: Automatically checks if project directory already exists before creation to prevent overwrites
- **Enhanced Project Setup Flow**: Improved prompts and validation during project scaffolding

### Changed

- **Dependency Installation**: All package installations now respect the user's chosen package manager (npm or pnpm)
- **Script Generation**: Generated package.json scripts now use the appropriate package manager commands
- **Setup Tasks**: All setup tasks (ESLint, Multer, Database) now use the selected package manager consistently

## [2.4.1]

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

## [2.4.0]

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

## [2.3.0]

### Added

- MySQL database support with full integration
- `knex` and `mysql2` packages for MySQL connection and query management
- Database selection between MongoDB, MySQL, or no database

### Changed

- Updated database connection handling to support multiple database types
- Improved database configuration management

### Fixed

- Minor bug fixes related to database connection handling

## [2.2.0]

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

## [2.1.0]

### Added

- Database selection option during project scaffolding
- Smart database bootstrapping with connection-dependent server startup
- Dedicated environment configuration file (`config/env.config.js`)

### Changed

- Server startup logic now waits for successful database connection when database is selected
- Improved environment variable organization and management

### Fixed

- Minor code cleanups and internal improvements

## [2.0.0]

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

## [1.1.0]

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

## [1.0.1]

### Fixed

- Minor bug fixes and stability improvements

## [1.0.0]

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
