import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import findRsvpsWithDetails from "~/actions/rsvp/find-rsvps-with-details";
import findUserByEventCode from "~/actions/user/find-user-by-event-code";
import UserAvatar from "~/components/user-avatar";

type Props = {
	code: string;
};

const RsvpTable = async ({ code }: Props) => {
	const [creator] = await findUserByEventCode({ code });

	const rsvpsWithDetails = await findRsvpsWithDetails({ code });

	if (rsvpsWithDetails.length === 0) {
		return <div>No attendees yet. RSVP to join the party!</div>;
	}

	const hostIdx = rsvpsWithDetails.findIndex(
		(rsvp) => rsvp.user.id === creator.id
	);

	if (hostIdx > 0) {
		const [host] = rsvpsWithDetails.splice(hostIdx, 1);

		host.message = (
			<span className="flex items-center gap-1">
				<CheckBadgeIcon className="text-primary" height="30" width="30" />
				Event Host
			</span>
		) as unknown as string; // TODO: Massage the client type.

		rsvpsWithDetails.unshift(host);
	}

	return (
		<div className="border-base-200 bg-base-100 overflow-x-auto rounded-xl border shadow">
			<table className="table-sm mt-0 mb-0 table">
				<thead>
					<tr>
						<th>RSVP</th>
						<th>Name</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					{rsvpsWithDetails.map((rsvp) => {
						return (
							<tr key={rsvp.id}>
								<th>
									<label>
										{rsvp.response === "yes" ? (
											<div className="badge badge-success badge-sm">
												Attending
											</div>
										) : (
											<div className="badge badge-neutral badge-sm">
												Not Attending
											</div>
										)}
									</label>
								</th>
								<td>
									<UserAvatar
										name={rsvp.user.name}
										url={rsvp.user.image}
										height={30}
										width={30}
									/>{" "}
									{rsvp.user.name}
								</td>
								<td>{rsvp.message}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default RsvpTable;

export const RsvpTableFallback = () => {
	return (
		<div className="flex w-full flex-col gap-4">
			<div className="skeleton h-12 w-1/2 md:w-1/4" />
			<div className="flex justify-around gap-2">
				<div className="skeleton h-10 w-1/3" />
				<div className="skeleton h-10 w-1/3" />
				<div className="skeleton h-10 w-1/3" />
			</div>
			<div className="flex justify-around gap-2">
				<div className="skeleton h-10 w-1/3" />
				<div className="skeleton h-10 w-1/3" />
				<div className="skeleton h-10 w-1/3" />
			</div>
			<div className="flex justify-around gap-2">
				<div className="skeleton h-10 w-1/3" />
				<div className="skeleton h-10 w-1/3" />
				<div className="skeleton h-10 w-1/3" />
			</div>
		</div>
	);
};
