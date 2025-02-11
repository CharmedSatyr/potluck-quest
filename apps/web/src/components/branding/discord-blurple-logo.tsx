import Image from "next/image";
import Link from "next/link";

const DiscordLogo = ({ width = 90 }: { width?: number }) => {
	const height = Math.round(width * 0.19);

	return (
		<Link
			href="https://www.discord.com"
			rel="noopener noreferrer"
			target="_blank"
		>
			<Image
				src="/static/discord-logo-blue.png"
				alt="Discord logo"
				height={height}
				width={width}
				className="not-prose m-0 inline"
			/>
		</Link>
	);
};

export default DiscordLogo;
