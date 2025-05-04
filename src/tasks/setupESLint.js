import fs from "fs";
import path from "path";

export async function setupESLintConfig() {
  const eslintConfigContent = `
import eslintPluginNode from 'eslint-plugin-n';
import eslintPluginPromise from 'eslint-plugin-promise';

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      node: eslintPluginNode,
      promise: eslintPluginPromise,
    },
    rules: {
      // Best practices
      "no-unused-vars": ["warn"],
      "no-console": "off",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],

      // Style
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],

      // Node.js-specific
      "node/callback-return": "warn",
      "node/handle-callback-err": "warn",
      "node/no-mixed-requires": "warn",
      "node/no-new-require": "warn",

      // Promise-specific
      "promise/always-return": "warn",
      "promise/no-return-wrap": "warn",
    },
  },
];
  `;

  fs.writeFileSync(
    path.join(process.cwd(), "eslint.config.js"),
    eslintConfigContent.trim()
  );

  console.log("✅ ESLint v9+ configuration (eslint.config.js) created!");
}
