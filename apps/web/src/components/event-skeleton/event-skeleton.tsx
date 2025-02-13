import {
	CalendarIcon,
	ClockIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline";
import Markdown from "react-markdown";
import { DiscordEventMetadata } from "~/actions/bot/event/fetch-discord-event-metadata";
import findEvent from "~/actions/event/find-event";
import findUserByEventCode from "~/actions/user/find-user-by-event-code";
import CopyLinkButton from "~/components/copy-link-button";
import DateTimeBlock from "~/components/event-skeleton/date-time-block";
import GuildIcon from "~/components/guild-icon";
import UserAvatar from "~/components/user-avatar";
import WarningAlert from "~/components/warning-alert";
import eventIsPassed from "~/utilities/event-is-passed";

type Props = {
	code: string;
	discordMetadata?: DiscordEventMetadata;
};

export const EventHeader = ({
	code,
	title,
}: {
	code: string;
	title: string;
}) => {
	return (
		<>
			<h1 className="text-primary-gradient mb-4 text-5xl">{title}</h1>
			<div className="font-bold">
				Event Code: <CopyLinkButton text={code} />
			</div>
		</>
	);
};

const EventSkeleton = async ({ code, discordMetadata }: Props) => {
	const [event] = await findEvent({ code });
	const [creator] = await findUserByEventCode({ code });

	const { description, hosts, location, startUtcMs, title } = event;

	const isPassed = eventIsPassed(startUtcMs);

	return (
		<div className="w-full">
			<EventHeader code={code} title={title} />

			<DateTimeBlock startUtcMs={startUtcMs} />
			<p className="flex items-center gap-2">
				<MapPinIcon className="-m-1 h-6 w-6" /> {location}
			</p>
			<p className="flex h-6 items-center gap-2">
				<UserAvatar name={creator.name} url={creator.image} />
				Hosted by {hosts || creator.name}{" "}
				{discordMetadata && (
					<>
						in{" "}
						<GuildIcon
							name={discordMetadata.name}
							url={discordMetadata.iconUrl}
						/>{" "}
						{discordMetadata.name}
					</>
				)}
			</p>

			<Markdown>{description}</Markdown>

			{isPassed && <WarningAlert text="This event date is in the past." />}
		</div>
	);
};

export default EventSkeleton;

export const EventSkeletonFallback = () => {
	return (
		<div className="mb-2 flex w-full flex-col gap-4">
			<div className="skeleton mb-[9px] h-10 w-50 sm:w-96" />
			<div className="mb-[1px] flex items-center font-bold">
				Event Code:{" "}
				<button className="btn btn-ghost btn-sm px-2 text-lg font-bold">
					<span className="text-secondary" />
				</button>
			</div>
			<div className="flex items-center gap-2">
				<CalendarIcon className="size-4" />{" "}
				<div className="skeleton h-8 w-44" />
				<ClockIcon className="size-4" /> <div className="skeleton h-8 w-24" />
			</div>
			<div className="flex items-center gap-2">
				<MapPinIcon className="-m-1 h-6 w-6" />{" "}
				<div className="skeleton h-8 w-24" />
			</div>
			<div className="flex items-center gap-2">
				<div className="avatar skeleton size-5 shrink-0 rounded-full" />
				<div className="skeleton h-8 w-56" />
			</div>
			<div className="skeleton h-8 w-72 sm:w-96" />
			<div className="skeleton h-8 w-72" />
		</div>
	);
};
