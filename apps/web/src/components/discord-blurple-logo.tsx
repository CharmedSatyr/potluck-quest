import Image from "next/image";
import Link from "next/link";

const DiscordLogo = ({ width = 100 }: { width?: number }) => (
	<Link
		href="https://www.discord.com"
		rel="noopener noreferrer"
		target="_blank"
	>
		<Image
			src="/static/discord-logo-blue.png"
			alt="Discord logo"
			height={width * 0.19}
			width={width}
			className="m-0 inline"
		/>
	</Link>
);

export default DiscordLogo;
