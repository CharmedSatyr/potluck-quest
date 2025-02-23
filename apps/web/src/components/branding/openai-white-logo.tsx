import Image from "next/image";
import Link from "next/link";
import openAiWhiteLockup from "public/static/openai-logos/PNGs/openai-white-lockup.png";

const OpenAiLogo = ({ width = 66 }: { width?: number }) => {
	return (
		<Link
			href="https://www.openai.com"
			rel="noopener noreferrer"
			target="_blank"
		>
			<Image
				alt="OpenAI logo"
				className="not-prose m-0 inline"
				src={openAiWhiteLockup}
				width={width}
			/>
		</Link>
	);
};

export default OpenAiLogo;
