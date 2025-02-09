import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/data/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				blurple: "#5865F2", // Official Discord blur/purple
				"dark-blurple": "#4955CC", // Custom on hover Discord blurple hue
			},
		},
	},
	plugins: [typography],
};
export default config;
