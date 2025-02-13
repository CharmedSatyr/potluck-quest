import Image from "next/image";
import Link from "next/link";

const OpenAiLogo = ({ width = 66 }: { width?: number }) => {
	const height = Math.round(width * 0.27);

	return (
		<Link
			href="https://www.openai.com"
			rel="noopener noreferrer"
			target="_blank"
		>
			<Image
				src="/static/openai-logos/PNGs/openai-white-lockup.png"
				alt="OpenAI logo"
				height={height}
				width={width}
				className="not-prose m-0 inline"
			/>
		</Link>
	);
};

export default OpenAiLogo;
