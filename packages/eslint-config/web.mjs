import { FlatCompat } from "@eslint/eslintrc";
import pluginDrizzle from "eslint-plugin-drizzle";
import path from "node:path";
import { fileURLToPath } from "node:url";
import baseConfig from "./base.mjs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
export default [
	...baseConfig,
	...compat.extends("next/core-web-vitals"),
	{
		plugins: {
			drizzle: pluginDrizzle
		},
	},
];
