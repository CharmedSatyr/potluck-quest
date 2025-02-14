import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import findRsvpsWithDetails from "~/actions/rsvp/find-rsvps-with-details";
import findUserByEventCode from "~/actions/user/find-user-by-event-code";
import UserAvatar from "~/components/user-avatar";

type Props = {
	code: string;
};

const AttendeeList = async ({ code }: Props) => {
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

		rsvpsWithDetails.unshift(host);
	}

	rsvpsWithDetails.sort((a, b) => {
		if (a.response === "yes" && b.response === "no") {
			return 1;
		}

		if (a.response === b.response) {
			return 0;
		}

		return -1;
	});

	return (
		<ul className="list bg-base-100 rounded-box border-base-300 border shadow">
			{rsvpsWithDetails
				.filter((rsvp) => rsvp.response === "yes")
				.map((rsvp, index) => {
					const isHost = creator.id === rsvp.user.id;
					return (
						<li key={rsvp.id} className="list-row not-prose pl-0">
							<div className="text-4xl font-thin tabular-nums opacity-30">
								{(index + 1).toString().padStart(2, "0")}
							</div>
							<div>
								<UserAvatar
									name={rsvp.user.name}
									url={rsvp.user.image}
									height={36}
									width={36}
								/>
							</div>
							<div
								className={`list-col-grow ${!rsvp.message && "flex items-center"}`}
							>
								{rsvp.user.name}&nbsp;
								{isHost && (
									<CheckBadgeIcon
										title="Event Host"
										className="text-primary inline"
										height="20"
										width="20"
									/>
								)}
								<p className="list-col-wrap text-xs opacity-60">
									{rsvp.message}
								</p>
							</div>

							<label className="flex items-center">
								{rsvp.response === "yes" ? (
									<div className="badge badge-success badge-sm">Attending</div>
								) : (
									<div className="badge badge-neutral badge-sm">
										Not Attending
									</div>
								)}
							</label>
						</li>
					);
				})}

			{rsvpsWithDetails
				.filter((rsvp) => rsvp.response === "no")
				.map((rsvp) => {
					const isHost = creator.id === rsvp.user.id;
					return (
						<li key={rsvp.id} className="list-row bg-base-100 not-prose pl-0">
							<div>
								<UserAvatar
									name={rsvp.user.name}
									url={rsvp.user.image}
									height={36}
									width={36}
								/>
							</div>
							<div
								className={`list-col-grow ${!rsvp.message && "flex items-center"}`}
							>
								{rsvp.user.name}&nbsp;
								{isHost && (
									<CheckBadgeIcon
										title="Event Host"
										className="text-primary inline"
										height="20"
										width="20"
									/>
								)}
								<p className="list-col-wrap text-xs opacity-60">
									{rsvp.message}
								</p>
							</div>

							<label className="flex items-center">
								{rsvp.response === "yes" ? (
									<div className="badge badge-success badge-sm">Attending</div>
								) : (
									<div className="badge badge-neutral badge-sm">
										Not Attending
									</div>
								)}
							</label>
						</li>
					);
				})}
		</ul>
	);
};

export default AttendeeList;
