import Image from "next/image";

type Props = {
	height?: number;
	name: string | null;
	url: string | null;
	width?: number;
};

const UserAvatar = ({ height, name, url, width }: Props) =>
	name && url ? (
		<Image
			alt={`${name}'s Avatar`}
			className="avatar border-secondary my-0 rounded-full border"
			src={url}
			height={height ?? "20"}
			width={width ?? "20"}
		/>
	) : null;

export default UserAvatar;
