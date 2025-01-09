export default {
	semi: true,
	singleQuote: false,
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	trailingComma: "es5",
	bracketSpacing: true,
	plugins: [
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
	proseWrap: "always",
};
