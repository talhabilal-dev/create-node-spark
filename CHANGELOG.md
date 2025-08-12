# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
