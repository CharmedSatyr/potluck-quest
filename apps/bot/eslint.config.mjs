import baseConfig from "@repo/eslint-config/base";
import tsParser from "@typescript-eslint/parser";

export default [
	...baseConfig,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	},
	{
		ignores: ["dist/**"],
	},
];
