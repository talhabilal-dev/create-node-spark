import { writeFile, readFile } from "../utils/fileSystem.js";
import path from "path";
import { logError, logSuccess } from "../utils/logger.js";

export async function setupESLintConfig(language: string): Promise<void> {
  try {
    const eslintConfigPath = path.join(process.cwd(), "eslint.config.js");

    let eslintConfigContent = '';

    if (language === 'TypeScript') {
      eslintConfigContent = `
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginNode from 'eslint-plugin-n';
import eslintPluginPromise from 'eslint-plugin-promise';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'node': eslintPluginNode,
      'promise': eslintPluginPromise,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // TypeScript-specific rules (relaxed)
      '@typescript-eslint/no-unused-vars': ['warn', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn', // Allow any for quick development
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'off', // Allow both interface and type
      '@typescript-eslint/consistent-type-imports': 'off', // Not essential for small teams
      
      // General code quality rules (relaxed)
      'no-console': 'off', // Allow console.log for debugging
      'eqeqeq': ['warn', 'always'],
      'curly': ['warn', 'all'],
      'indent': ['warn', 2],
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-trailing-spaces': 'warn',
      'no-multiple-empty-lines': ['warn', { 'max': 3, 'maxEOF': 2 }],
      
      // Node.js specific rules (essential only)
      'node/no-deprecated-api': 'warn',
      'node/no-extraneous-import': 'warn',
      'node/no-missing-import': 'off', // TypeScript handles this
      'node/no-unpublished-import': 'off',
      
      // Promise rules (relaxed)
      'promise/always-return': 'warn',
      'promise/catch-or-return': 'warn',
      'promise/param-names': 'warn',
      'promise/no-nesting': 'off', // Sometimes necessary
      'promise/avoid-new': 'off', // Allow Promise constructor
    },
  },
  {
    files: ['**/*.js'],
    plugins: {
      'node': eslintPluginNode,
      'promise': eslintPluginPromise,
    },
        languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_'
      }],
      'no-console': 'off', // Allow console.log
      'eqeqeq': ['warn', 'always'],
      'curly': ['warn', 'all'],
      'indent': ['warn', 2],
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-trailing-spaces': 'warn',
      'no-multiple-empty-lines': ['warn', { 'max': 3, 'maxEOF': 2 }],
      
      // Node.js rules (essential)
      'node/no-deprecated-api': 'warn',
      'node/callback-return': 'off', // Not essential for modern async/await
      'node/handle-callback-err': 'warn',
      
      // Promise rules (relaxed)
      'promise/always-return': 'warn',
      'promise/catch-or-return': 'warn',
      'promise/param-names': 'warn',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': 'off',
    },
  },
  {
        ignores: [
      'node_modules',
      'dist',
      'build',
      'out',
      '*.log',
      'coverage',
      '.nyc_output',
      '.vscode',
      '.idea',
      '.DS_Store',
      'Thumbs.db',
      '*.tmp',
      '*.temp',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local'
        ],
   },

];
      `;
    } else {
      // JavaScript configuration (also relaxed)
      eslintConfigContent = `
    import eslint from '@eslint/js';
    import eslintPluginNode from 'eslint-plugin-n';
    import eslintPluginPromise from 'eslint-plugin-promise';

    /** @type {import("eslint").Linter.FlatConfig[]} */
    export default [
      eslint.configs.recommended,
      {
        files: ['**/*.js', '**/*.mjs'],
        plugins: {
      'node': eslintPluginNode,
      'promise': eslintPluginPromise,
        },
        languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
        },
        rules: {
      'no-unused-vars': ['warn', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_'
      }],
      'no-console': 'off', // Allow console.log
      'eqeqeq': ['warn', 'always'],
      'curly': ['warn', 'all'],
      'indent': ['warn', 2],
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-trailing-spaces': 'warn',
      'no-multiple-empty-lines': ['warn', { 'max': 3, 'maxEOF': 2 }],
      
      // Node.js rules (essential)
      'node/no-deprecated-api': 'warn',
      'node/callback-return': 'off',
      'node/handle-callback-err': 'warn',
      
      // Promise rules (relaxed)
      'promise/always-return': 'warn',
      'promise/catch-or-return': 'warn',
      'promise/param-names': 'warn',
        },
      },
      {
        files: ['**/*.test.js', '**/*.spec.js'],
        rules: {
      'no-console': 'off',
        },
      },
      {
        ignores: [
      'node_modules',
      'dist',
      'build',
      'out',
      '*.log',
      'coverage',
      '.nyc_output',
      '.vscode',
      '.idea',
      '.DS_Store',
      'Thumbs.db',
      '*.tmp',
      '*.temp',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local'
        ],
      },
    ];
      `;
    }

    await writeFile(eslintConfigPath, eslintConfigContent.trim(), "utf-8");
    logSuccess(`✅ ESLint configuration for "${language}" created successfully`);

    // Create a basic .prettierrc for code formatting consistency
    const prettierConfigPath = path.join(process.cwd(), ".prettierrc");
    const prettierConfig = {
      semi: true,
      trailingComma: "es5",
      singleQuote: true,
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      endOfLine: "lf"
    };

    await writeFile(prettierConfigPath, JSON.stringify(prettierConfig, null, 2), "utf-8");
    logSuccess(`✅ Created .prettierrc configuration`);

    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJsonRaw = await readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonRaw);

    let lintCommand, lintFixCommand;

    if (language === "TypeScript") {
      lintCommand = "eslint src --ext .ts,.tsx";
      lintFixCommand = "eslint src --ext .ts,.tsx --fix";
    } else {
      lintCommand = "eslint . --ext .js,.mjs";
      lintFixCommand = "eslint . --ext .js,.mjs --fix";
    }

    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.lint = lintCommand;
    packageJson.scripts["lint:fix"] = lintFixCommand;
    packageJson.scripts["lint:check"] = lintCommand + " --max-warnings 0";
    packageJson.scripts["format"] = "prettier --write .";
    packageJson.scripts["format:check"] = "prettier --check .";

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf-8");
    logSuccess(`✅ Added lint and format scripts to package.json`);
    logSuccess(`  - lint: "${lintCommand}"`);
    logSuccess(`  - lint:fix: "${lintFixCommand}"`);
    logSuccess(`  - lint:check: "${lintCommand} --max-warnings 0"`);
    logSuccess(`  - format: "prettier --write ."`);
    logSuccess(`  - format:check: "prettier --check ."`);
  } catch (error: any) {
    logError(error);
  }
}
