"use server";

import findCommitments from "~/actions/commitment/find-commitments";
import findSlots from "~/actions/slot/find-slots";
import findUsers from "~/actions/user/find-users";
import UserAvatar from "~/components/user-avatar";

type UserWithCount = Pick<User, "id" | "image" | "name"> & { count: number };

type Props = {
	committedUsers: UserWithCount[];
};

const Avatars = ({ committedUsers }: Props) => {
	return committedUsers.map((user) =>
		user.image ? (
			<div key={user.id} className="indicator">
				<UserAvatar name={user.name} url={user.image} />
				<span className="badge indicator-item badge-primary badge-sm">
					{user.count}
				</span>
			</div>
		) : (
			<div key={user.id} className="skeleton h-8 w-8 rounded-full border" />
		)
	);
};

// TODO: There is something better now. See the slot manager.
/** @deprecated */
const CommittedUsersBySlot = async (
	code: string
): Promise<Map<string, React.JSX.Element>> => {
	if (!code) {
		return new Map();
	}

	const slots = await findSlots({ code });
	const commitments = await findCommitments({ eventCode: code });
	const usersToFind = commitments.map((c) => c.createdBy);

	if (usersToFind.length === 0) {
		return new Map();
	}

	const users = await findUsers({
		users: usersToFind as [string, ...string[]],
	});

	const map = new Map();

	slots.forEach((slot) => {
		const relatedCommitments = commitments.filter((c) => c.slotId === slot.id);
		const eventUsers = relatedCommitments.map((c) => c.createdBy);
		const deduplicatedRelatedUsers = new Set(eventUsers);
		const committedUsers = users
			.filter((u) => deduplicatedRelatedUsers.has(u.id))
			.map((u) => ({
				id: u.id,
				image: u.image,
				name: u.name,
				count: relatedCommitments
					.filter((c) => c.createdBy === u.id)
					.reduce((acc, curr) => acc + curr.quantity, 0),
			}));

		if (!committedUsers.length) {
			return;
		}

		map.set(slot.id, <Avatars committedUsers={committedUsers} />);
	});

	return map;
};

export default CommittedUsersBySlot;
