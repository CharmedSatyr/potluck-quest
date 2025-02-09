import typography from "@tailwindcss/typography";
//import daisyui from "daisyui";
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
	/*
	daisyui: {
		themes: [
			{
				potluck: {
					primary: "#FF8A50", // Slightly muted orange for vibrancy on dark
					secondary: "#4CAF50", // Deep green with good contrast
					accent: "#FFB74D", // Rich golden-yellow for highlights
					neutral: "#3E2723", // Dark brown for a warm neutral base
					"base-100": "hsl(229deg 25% 14%)",
					"base-200": "hsl(229deg 25% 8%)",
					"base-300": "hsl(229deg 25% 4%)",
					info: "#1E88E5", // Deep blue for informational tones
					success: "#66BB6A", // Calm green for success indicators
					warning: "#FFB300", // Bold amber for warnings
					error: "#D32F2F", // Deep red for errors
				},
			},
		],
	},
	*/
	plugins: [typography /*daisyui*/],
};
export default config;
