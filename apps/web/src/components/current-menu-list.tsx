import OverlappingAvatars from "./overlapping-avatars";
import findSlotContainerDetails from "~/actions/slot/find-slot-container-details";

const CurrentMenuList = async ({ code }: { code: string }) => {
	const slotContainerDetails = await findSlotContainerDetails({ code });

	if (slotContainerDetails.length === 0) {
		return <div>No plans yet!</div>;
	}

	return (
		<ul className="list bg-base-100 rounded-box not-prose border-base-300 border shadow-md">
			{slotContainerDetails.map((detail) => (
				<li
					key={detail.slotId}
					className="list-row flex items-center justify-between"
				>
					<div className="list-col-grow text-sm md:w-6/12">{detail.item}</div>
					<div className="list-col-grow hidden justify-end sm:flex">
						<OverlappingAvatars users={detail.users} />
					</div>
					<div className="text-right text-sm">
						{detail.totalCommitments} of {detail.requestedCount} filled
					</div>
				</li>
			))}
		</ul>
	);
};

export default CurrentMenuList;
