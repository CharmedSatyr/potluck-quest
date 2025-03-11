import Image from "next/image";
import discordLogoBlue from "public/static/discord-logo-blue.png";
import ExternalLink from "~/components/external-link";

const DiscordLogo = ({ width = 80 }: { width?: number }) => {
	return (
		<ExternalLink href="https://www.discord.com">
			<Image
				alt="Discord logo"
				className="not-prose m-0 inline"
				src={discordLogoBlue}
				width={width}
			/>
		</ExternalLink>
	);
};

export default DiscordLogo;
