import { writeFile, readFile } from "../utils/fileSystem.js";
import path from "path";
import { logInfo, logSuccess } from "../utils/logger.js";

export async function setupDocker(
    projectName: string,
    language: string,
    framework: 'Express' | 'Fastify' | 'none',
    database: 'MongoDB' | 'MySQL' | 'PostgreSQL' | 'none',
    packageManager: 'npm' | 'pnpm'
): Promise<void> {
    try {
        logInfo("🐳 Setting up Docker configuration...");

        const isTS = language === "TypeScript";
        const extension = isTS ? "ts" : "js";

        // Create Dockerfile
        const dockerfilePath = path.join(process.cwd(), "Dockerfile");
        const dockerfileContent = generateDockerfile(language, framework, packageManager);
        await writeFile(dockerfilePath, dockerfileContent, "utf-8");

        // Create .dockerignore
        const dockerignorePath = path.join(process.cwd(), ".dockerignore");
        const dockerignoreContent = generateDockerignore();
        await writeFile(dockerignorePath, dockerignoreContent, "utf-8");

        // Create docker-compose.yml if database is selected
        if (database !== 'none') {
            const dockerComposePath = path.join(process.cwd(), "docker-compose.yml");
            const dockerComposeContent = generateDockerCompose(projectName, database, framework);
            await writeFile(dockerComposePath, dockerComposeContent, "utf-8");
        }

        // Create development Dockerfile
        const dockerfileDevPath = path.join(process.cwd(), "Dockerfile.dev");
        const dockerfileDevContent = generateDockerfileDev(language, framework, packageManager);
        await writeFile(dockerfileDevPath, dockerfileDevContent, "utf-8");

        // Add Docker scripts to package.json
        await addDockerScriptsToPackageJson(database);

        logSuccess("Docker configuration files created successfully!", false);
    } catch (error) {
        throw error;
    }
}

function generateDockerfile(language: string, framework: string, packageManager: 'npm' | 'pnpm'): string {
    const isTS = language === "TypeScript";
    const nodeVersion = "20-alpine";
    const pm = packageManager === 'pnpm' ? 'pnpm' : 'npm';

    const installCmd = packageManager === 'pnpm'
        ? 'RUN npm install -g pnpm && pnpm install --frozen-lockfile'
        : 'RUN npm ci';

    const buildCmd = isTS ? `RUN ${pm} run build` : '';
    const startCmd = isTS
        ? `CMD ["node", "dist/src/index.js"]`
        : `CMD ["node", "src/index.js"]`;

    return `# Multi-stage build for production
# Stage 1: Build stage
FROM node:${nodeVersion} AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
${packageManager === 'pnpm' ? 'COPY pnpm-lock.yaml ./' : ''}

# Install dependencies
${installCmd}

# Copy source code
COPY . .

${buildCmd}

# Stage 2: Production stage
FROM node:${nodeVersion} AS production

# Set working directory
WORKDIR /app

# Set NODE_ENV
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./
${packageManager === 'pnpm' ? 'COPY pnpm-lock.yaml ./' : ''}

# Install production dependencies only
${packageManager === 'pnpm'
            ? 'RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod'
            : 'RUN npm ci --only=production'}

# Copy built application from builder stage
${isTS ? 'COPY --from=builder /app/dist ./dist' : 'COPY --from=builder /app/src ./src'}
COPY --from=builder /app/public ./public

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \\
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
${startCmd}
`;
}

function generateDockerfileDev(language: string, framework: string, packageManager: 'npm' | 'pnpm'): string {
    const isTS = language === "TypeScript";
    const nodeVersion = "20-alpine";
    const pm = packageManager === 'pnpm' ? 'pnpm' : 'npm';

    const installCmd = packageManager === 'pnpm'
        ? 'RUN npm install -g pnpm && pnpm install'
        : 'RUN npm install';

    const devCmd = isTS
        ? `CMD ["${pm}", "run", "dev"]`
        : `CMD ["${pm}", "run", "dev"]`;

    return `# Development Dockerfile
FROM node:${nodeVersion}

# Set working directory
WORKDIR /app

# Install ${packageManager === 'pnpm' ? 'pnpm globally' : 'dependencies'}
${packageManager === 'pnpm' ? 'RUN npm install -g pnpm' : ''}

# Copy package files
COPY package*.json ./
${packageManager === 'pnpm' ? 'COPY pnpm-lock.yaml ./' : ''}

# Install all dependencies (including dev)
${installCmd}

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server with hot reload
${devCmd}
`;
}

function generateDockerignore(): string {
    return `# Node modules
node_modules
npm-debug.log
yarn-error.log
pnpm-debug.log

# Build output
dist
build
*.tsbuildinfo

# Environment files
.env
.env.local
.env.*.local

# IDE and editor files
.vscode
.idea
*.swp
*.swo
*~
.DS_Store

# Version control
.git
.gitignore
.gitattributes

# Testing
coverage
.nyc_output
*.lcov

# Documentation
README.md
CHANGELOG.md
LICENSE
docs

# Docker files
Dockerfile
Dockerfile.dev
.dockerignore
docker-compose.yml
docker-compose.*.yml

# Logs
logs
*.log

# Temporary files
tmp
temp
.cache

# OS files
Thumbs.db
`;
}

function generateDockerCompose(projectName: string, database: string, framework: string): string {
    const servicePort = "3000";
    const dbConfig = getDbConfig(database);

    return `version: '3.8'

services:
  # Application service
  app:
    container_name: ${projectName}-app
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "\${PORT:-${servicePort}}:${servicePort}"
    environment:
      - NODE_ENV=development
      - PORT=${servicePort}
${database !== 'none' ? `      - ${dbConfig.envVar}=${dbConfig.connectionString}` : ''}
    volumes:
      - .:/app
      - /app/node_modules
${database !== 'none' ? `    depends_on:
      - ${database.toLowerCase()}` : ''}
    networks:
      - ${projectName}-network
    restart: unless-stopped

${database !== 'none' ? generateDatabaseService(database, projectName) : ''}
networks:
  ${projectName}-network:
    driver: bridge

volumes:
${database !== 'none' ? `  ${database.toLowerCase()}-data:` : ''}
`;
}

function getDbConfig(database: string): { envVar: string; connectionString: string } {
    switch (database) {
        case 'MongoDB':
            return {
                envVar: 'MONGO_URI',
                connectionString: 'mongodb://mongodb:27017/myapp'
            };
        case 'MySQL':
            return {
                envVar: 'MYSQL_HOST',
                connectionString: 'mysql'
            };
        case 'PostgreSQL':
            return {
                envVar: 'DATABASE_URL',
                connectionString: 'postgresql://postgres:postgres@postgres:5432/myapp'
            };
        default:
            return { envVar: '', connectionString: '' };
    }
}

function generateDatabaseService(database: string, projectName: string): string {
    switch (database) {
        case 'MongoDB':
            return `  # MongoDB service
  mongodb:
    container_name: ${projectName}-mongodb
    image: mongo:7-jammy
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_DATABASE=myapp
    volumes:
      - mongodb-data:/data/db
    networks:
      - ${projectName}-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5
`;

        case 'MySQL':
            return `  # MySQL service
  mysql:
    container_name: ${projectName}-mysql
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=root_password
      - MYSQL_DATABASE=myapp
      - MYSQL_USER=user
      - MYSQL_PASSWORD=password
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - ${projectName}-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
`;

        case 'PostgreSQL':
            return `  # PostgreSQL service
  postgres:
    container_name: ${projectName}-postgres
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=myapp
    volumes:
      - postgresql-data:/var/lib/postgresql/data
    networks:
      - ${projectName}-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
`;

        default:
            return '';
    }
}

async function addDockerScriptsToPackageJson(database: string): Promise<void> {
    try {
        const packageJsonPath = path.join(process.cwd(), "package.json");
        const rawPackageJson = await readFile(packageJsonPath, "utf-8");
        const packageJson = JSON.parse(rawPackageJson);

        // Add Docker-related scripts
        const dockerScripts: Record<string, string> = {
            "docker:build": "docker build -t app:latest .",
            "docker:run": "docker run -p 3000:3000 --env-file .env app:latest",
            "docker:dev": "docker build -f Dockerfile.dev -t app:dev . && docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules app:dev",
        };

        // Add docker-compose scripts if database is selected
        if (database !== 'none') {
            dockerScripts["docker:up"] = "docker-compose up -d";
            dockerScripts["docker:down"] = "docker-compose down";
            dockerScripts["docker:logs"] = "docker-compose logs -f";
            dockerScripts["docker:restart"] = "docker-compose restart";
        }

        // Merge with existing scripts
        packageJson.scripts = {
            ...packageJson.scripts,
            ...dockerScripts,
        };

        // Write updated package.json
        await writeFile(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2),
            "utf-8"
        );
    } catch (error) {
        throw error;
    }
}
