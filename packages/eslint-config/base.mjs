import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import turboPlugin from "eslint-plugin-turbo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("plugin:prettier/recommended"),
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
      turbo: turboPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
];
