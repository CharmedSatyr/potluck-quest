import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import findEvent from "~/actions/event/find-event";
import findUserByEventCode from "~/actions/user/find-user-by-event-code";
import CopyLinkButton from "~/components/copy-link-button";
import DateTimeBlock from "~/components/event-skeleton/date-time-block";
import WarningAlert from "~/components/warning-alert";
import eventIsPassed from "~/utilities/event-is-passed";

type Props = {
	code: string;
	discordMetadata?: { name: string; iconURL: string };
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
			<h1 className="text-primary-gradient mb-4 text-5xl font-bold">{title}</h1>
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
				<MapPinIcon className="h-6 w-6" /> {location}
			</p>
			<p className="flex h-6 items-center gap-2">
				<Image
					alt={`${creator.name}'s Avatar`}
					className="avatar rounded-full border"
					src={creator.image!}
					height="20"
					width="20"
				/>
				Hosted by {hosts || creator.name}{" "}
				{discordMetadata && (
					<>
						in
						<Image
							alt={`${creator.name}'s Avatar`}
							className="avatar rounded-full border"
							src={discordMetadata.iconURL}
							height="20"
							width="20"
						/>
						{discordMetadata.name}
					</>
				)}
			</p>

			<p>{description}</p>

			{isPassed && <WarningAlert text="This event date is in the past." />}
		</div>
	);
};

export default EventSkeleton;

export const EventSkeletonFallback = () => {
	return (
		<div className="mb-2 flex w-full flex-col gap-4">
			<div className="skeleton h-12 w-3/4 md:h-16" />
			<div className="skeleton h-8 w-1/2" />
			<div className="flex gap-2">
				<div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
				<div className="skeleton h-8 w-3/12" />
				<div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
				<div className="skeleton h-8 w-2/12" />
			</div>
			<div className="flex gap-2">
				<div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
				<div className="skeleton h-8 w-1/2" />
			</div>
			<div className="flex gap-2">
				<div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
				<div className="skeleton h-8 w-7/12" />
			</div>
			<div className="skeleton h-8 w-3/4" />
		</div>
	);
};
