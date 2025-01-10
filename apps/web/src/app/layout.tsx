// TODO: Use @next/env
import * as dotenv from "dotenv";
import { Settings } from "luxon";
import type { Metadata, Viewport } from "next";
import { Sen } from "next/font/google";
import "~/app/globals.css";
import NavBar from "~/components/nav-bar";
import siteMetadata from "~/data/site-metadata";

dotenv.config();

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#212121",
};

const inter = Sen({ subsets: ["latin"], weight: "variable" });

export const metadata: Metadata = {
	description: siteMetadata.description,
	title: siteMetadata.title,
};

Settings.defaultZone = "utc";

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body
				className={`${inter.className} prose flex h-screen w-screen max-w-none flex-col items-center`}
			>
				<div className="bg-pattern fixed z-[-3] h-screen w-screen" />
				<div className="bg-noise fixed z-[-2] h-screen w-screen animate-spin" />
				<div className="bg-pulsing-gradient fixed bottom-1/3 z-[-1] h-1/4 w-3/4" />

				<div className="fixed z-50 w-full">
					<NavBar />
				</div>
				<div className="2xl:7/12 container flex w-full justify-center px-4 py-24 md:px-10 lg:w-9/12 xl:w-8/12">
					{children}
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
