import baseConfig from "./base.mjs"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals.js";
import pluginDrizzle from "eslint-plugin-drizzle";

/** @type {import("eslint").Linter.Config[]} */
export default [
	...baseConfig,
	{
		plugins: nextCoreWebVitals.extends.plugins,
		rules: nextCoreWebVitals.extends.rules,
		overrides: nextCoreWebVitals.extends.overrides,
	},
	{
		plugins: {
			drizzle: pluginDrizzle,
		},
	},
];
