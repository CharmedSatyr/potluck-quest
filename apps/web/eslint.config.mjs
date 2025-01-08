import baseConfig from "@repo/eslint-config/base";
import nextConfig from "eslint-config-next/core-web-vitals.js";
import pluginDrizzle from "eslint-plugin-drizzle";

/** @type {import("eslint").Linter.Config[]} */
export default [
	...baseConfig,
	{
		plugins: nextConfig.extends.plugins,
		rules: nextConfig.extends.rules,
		overrides: nextConfig.extends.overrides,
	},
	{
		plugins: {
			drizzle: pluginDrizzle,
		},
	},
];
