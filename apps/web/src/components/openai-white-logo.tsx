import Image from "next/image";
import Link from "next/link";

const OpenAiLogo = ({ width = 72 }: { width?: number }) => (
	<Link href="https://www.openai.com" rel="noopener noreferrer" target="_blank">
		<Image
			src="/static/openai-logos/PNGs/openai-white-lockup.png"
			alt="OpenAI logo"
			height={width * 0.27}
			width={width}
			className="m-0 inline"
		/>
	</Link>
);

export default OpenAiLogo;
