import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "/avatars/**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "/embed/avatars/**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "/icons/**",
			},
		],
	},
};
const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
	},
});

export default withMDX(nextConfig);
