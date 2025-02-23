import Image from "next/image";
import Link from "next/link";
import discordLogoBlue from "public/static/discord-logo-blue.png";

const DiscordLogo = ({ width = 80 }: { width?: number }) => {
	return (
		<Link
			href="https://www.discord.com"
			rel="noopener noreferrer"
			target="_blank"
		>
			<Image
				alt="Discord logo"
				className="not-prose m-0 inline"
				src={discordLogoBlue}
				width={width}
			/>
		</Link>
	);
};

export default DiscordLogo;
