import { writeFile, readFile } from "../utils/fileSystem.js";
import path from "path";
import { logError, logSuccess } from "../utils/logger.js";

export async function setupESLintConfig(language) {
  try {
    const eslintConfigPath = path.join(process.cwd(), "eslint.config.js");

    const eslintConfigContent = `
import eslintPluginNode from 'eslint-plugin-n';
import eslintPluginPromise from 'eslint-plugin-promise';

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      node: eslintPluginNode,
      promise: eslintPluginPromise,
    },
    rules: {
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'node/callback-return': 'warn',
      'node/handle-callback-err': 'warn',
      'node/no-mixed-requires': 'warn',
      'node/no-new-require': 'warn',
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
    },
  },
];
    `;

    await writeFile(eslintConfigPath, eslintConfigContent.trim(), "utf-8");
    logSuccess(`✅ ESLint configuration for "${language}" created successfully`);

    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJsonRaw = await readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonRaw);

    const lintCommand =
      language === "TypeScript"
        ? "eslint dist --ext .js"
        : "eslint . --ext .js";

    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.lint = lintCommand;

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf-8");
    logSuccess(`✅ Added "lint" script to package.json: "${lintCommand}"`);
  } catch (error) {
    logError(error);
  }
}
