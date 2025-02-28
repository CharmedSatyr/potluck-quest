import findSlotContainerDetails from "~/actions/slot/find-slot-container-details";

//import UserAvatar from "~/components/user-avatar";

/*
type Users = {
	id: string;
	image: string | null;
	name: string | null;
	commitments: number;
}[];

const Avatars = ({ users }: { users: Users }) => {
	return users.map(({ id, image, name, commitments }) =>
		image ? (
			<div key={id} className="indicator not-prose">
				<span className="indicator-item badge badge-primary badge-xs">
					{commitments}
				</span>
				<UserAvatar name={name} url={image} height={30} width={30} />
			</div>
		) : (
			<div key={id} className="skeleton h-8 w-8 rounded-full border" />
		)
	);
};
*/

const CurrentMenuList = async ({ code }: { code: string }) => {
	const slotContainerDetails = await findSlotContainerDetails({ code });

	if (slotContainerDetails.length === 0) {
		return <div>No plans yet!</div>;
	}

	return (
		<ul className="list bg-base-100 rounded-box not-prose border-base-300 border shadow-md">
			{slotContainerDetails.map((detail) => (
				<li key={detail.slotId} className="list-row items-center">
					<div className="list-col-grow">
						<div>{detail.item}</div>
					</div>
					{/* TODO: Add in once you can test with multiple avatars. <div><Avatars users={detail.users} /></div> */}
					<div>
						{detail.totalCommitments} of {detail.requestedCount} filled
					</div>
				</li>
			))}
		</ul>
	);
};

export default CurrentMenuList;
