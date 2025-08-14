export function getInstallCommand(packageManager: 'npm' | 'pnpm', packages: string, isDev: boolean = false): string {
    const devFlag = isDev ? '--save-dev' : '';

    switch (packageManager) {
        case 'npm':
            return `npm install ${packages} ${devFlag}`.trim();
        case 'pnpm':
            return `pnpm add ${packages} ${isDev ? '-D' : ''}`.trim();
        default:
            return `npm install ${packages} ${devFlag}`.trim();
    }
}

export function getInitCommand(packageManager: 'npm' | 'pnpm'): string {
    switch (packageManager) {
        case 'npm':
            return 'npm init -y';
        case 'pnpm':
            return 'pnpm init';
        default:
            return 'npm init -y';
    }
}

export function getRunCommand(packageManager: 'npm' | 'pnpm', script: string): string {
    switch (packageManager) {
        case 'npm':
            return `npm run ${script}`;
        case 'pnpm':
            return `pnpm ${script}`;
        default:
            return `npm run ${script}`;
    }
}
