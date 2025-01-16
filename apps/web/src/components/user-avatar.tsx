import Image from "next/image";

type Props = {
	name: string | null;
	url: string | null;
};

const UserAvatar = ({ name, url }: Props) =>
	name && url ? (
		<Image
			alt={`${name}'s Avatar`}
			className="avatar my-0 rounded-full border"
			src={url}
			height="20"
			width="20"
		/>
	) : null;

export default UserAvatar;
