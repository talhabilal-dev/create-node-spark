export interface ProjectDetails {
    projectName: string;
    packageManager: 'npm' | 'pnpm';
    language: 'JavaScript' | 'TypeScript';
    framework: 'none' | 'Express' | 'Fastify';
    database: 'none' | 'MongoDB' | 'MySQL' | 'PostgreSQL';
    features: ('eslint' | 'multer' | 'docker')[];
}

export interface DependencyConfig extends ProjectDetails {
    // Additional properties for dependency configuration
}

export interface EnvironmentConfig {
    PORT: number | string;
    MONGO_URI?: string;
    MYSQL_HOST?: string;
    MYSQL_PORT?: number | string;
    MYSQL_DATABASE?: string;
    MYSQL_USER?: string;
    MYSQL_PASSWORD?: string;
    DATABASE_URL?: string;
}
