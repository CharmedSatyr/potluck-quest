import Image from "next/image";

type Props = {
	name: string;
	url: string;
};

const GuildIcon = ({ name, url }: Props) => (
	<Image
		alt={`${name}'s Icon`}
		className="avatar my-0 rounded-full border"
		src={url}
		height="20"
		width="20"
	/>
);

export default GuildIcon;
