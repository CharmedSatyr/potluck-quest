import Image from "next/image";
import openAiWhiteLockup from "public/static/openai-logos/PNGs/openai-white-lockup.png";
import ExternalLink from "~/components/external-link";

const OpenAiLogo = ({ width = 66 }: { width?: number }) => {
	return (
		<ExternalLink href="https://www.openai.com">
			<Image
				alt="OpenAI logo"
				className="not-prose m-0 inline"
				src={openAiWhiteLockup}
				width={width}
			/>
		</ExternalLink>
	);
};

export default OpenAiLogo;
