export interface ProjectDetails {
    projectName: string;
    packageManager: 'npm' | 'pnpm';
    language: 'JavaScript' | 'TypeScript';
    framework: 'none' | 'Express' | 'Fastify';
    database: 'none' | 'MongoDB' | 'MySQL' | 'PostgreSQL';
    features: ('eslint' | 'multer')[];
}

export interface DependencyConfig extends ProjectDetails {
    // Additional properties for dependency configuration
}
