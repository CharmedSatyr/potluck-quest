import UserAvatar from "~/components/user-avatar";

type Props = {
	users: {
		id: string;
		image: string | null;
		name: string | null;
		commitments: number;
	}[];
};

const OverlappingAvatars = ({ users }: Props) => {
	return (
		<div className="flex items-center">
			{users.map(({ id, image, name }, i) =>
				image ? (
					<div
						className="not-prose relative"
						key={id}
						style={{
							marginLeft: users.length > 5 ? -1 * users.length : 4,
							zIndex: i,
						}}
					>
						<UserAvatar name={name} url={image} height={30} width={30} />
					</div>
				) : (
					<div key={id} className="skeleton h-8 w-8 rounded-full border" />
				)
			)}
		</div>
	);
};

export default OverlappingAvatars;
