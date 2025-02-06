import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";
import fetchDiscordEventMetadata, {
	type DiscordEventMetadata,
} from "~/actions/bot/event/fetch-discord-event-metadata";
import findEvent from "~/actions/event/find-event";
import findUserEventRsvp from "~/actions/rsvp/find-user-event-rsvp";
import findUserByEventCode from "~/actions/user/find-user-by-event-code";
import EditLink from "~/app/event/[code]/edit-link";
import { auth } from "~/auth";
import CommitmentsTable, {
	CommitmentsTableFallback,
} from "~/components/commitments-table";
import DeleteEventForm from "~/components/delete-event-button";
import DateTimeBlock from "~/components/event-skeleton/date-time-block";
import EventSkeleton, {
	EventHeader,
	EventSkeletonFallback,
} from "~/components/event-skeleton/event-skeleton";
import GuildIcon from "~/components/guild-icon";
import { DiscordIcon } from "~/components/icons/discord";
import RsvpForm, { RsvpFormFallback } from "~/components/rsvp-form";
import RsvpTable, { RsvpTableFallback } from "~/components/rsvp-table";
import SlideIn from "~/components/slide-in";
import SlotManager, { SlotManagerFallback } from "~/components/slot-manager";
import UserAvatar from "~/components/user-avatar";
import genPageMetadata from "~/seo";
import eventIsPassed from "~/utilities/event-is-passed";

type MetadataProps = {
	params: Promise<{ code: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({
	params: paramsPromise,
}: MetadataProps): Promise<Metadata> => {
	const params = await paramsPromise;

	return genPageMetadata({ title: `${params?.code}` });
};

type Props = { params: Promise<{ code: string }> };

const Container = ({ children }: PropsWithChildren) => (
	<main className="contrast-container flex flex-wrap">{children}</main>
);

const EventSection = ({
	code,
	discordMetadata,
}: {
	code: string;
	discordMetadata?: DiscordEventMetadata;
}) => (
	<section className="min-h-72 w-full md:w-10/12">
		<Suspense fallback={<EventSkeletonFallback />}>
			<EventSkeleton code={code} discordMetadata={discordMetadata} />
		</Suspense>
	</section>
);

const AttendeesSection = ({ code }: { code: string }) => (
	<section className="w-full">
		<Suspense fallback={<RsvpTableFallback />}>
			<SlideIn>
				<h2>Attendees</h2>
				<RsvpTable code={code} />
			</SlideIn>
		</Suspense>
	</section>
);

const CommitmentsSection = async ({ code }: { code: string }) => (
	<section className="my-4 w-full">
		<Suspense fallback={<CommitmentsTableFallback />}>
			<SlideIn>
				<h2 className="m-0 p-0">On the Menu</h2>
				<CommitmentsTable code={code} />
			</SlideIn>
		</Suspense>
	</section>
);

const ManageEventSection = ({
	code,
	eventData,
}: {
	code: string;
	eventData: EventDataWithCtx;
}) => {
	return (
		<section className="flex h-fit w-full flex-col">
			<Suspense fallback={<RsvpFormFallback />}>
				<SlideIn>
					<EditLink code={code} eventData={eventData} />
				</SlideIn>
				<SlideIn>
					<DeleteEventForm code={code} redirect={true} />
				</SlideIn>
			</Suspense>
		</section>
	);
};

const RsvpSection = ({
	code,
	discordMetadata,
	userId,
}: {
	code: string;
	discordMetadata?: DiscordEventMetadata;
	userId: string;
}) => (
	<section className="w-full">
		<Suspense fallback={<RsvpFormFallback />}>
			<SlideIn>
				<RsvpForm
					code={code}
					currentRsvpPromise={findUserEventRsvp({
						code,
						createdBy: userId,
					})}
					discordMetadata={discordMetadata}
				/>
			</SlideIn>
		</Suspense>
	</section>
);

const FoodPlanSection = ({ code }: { code: string }) => {
	// The weird margins account for fallback spacing.
	return (
		<section className="my-10 w-full">
			<Suspense fallback={<SlotManagerFallback />}>
				<SlideIn>
					<div className="-my-10">
						<h2>On the Menu</h2>
						<SlotManager code={code} />
					</div>
				</SlideIn>
			</Suspense>
		</section>
	);
};

const LoggedOutView = ({ code }: { code: string }) => (
	<Container>
		<section className="w-full">
			<Suspense>
				<SlideIn>
					<EventHeader code={code} title="Something's Happening..." />
					<p>Sign in to see all the details!</p>
				</SlideIn>
			</Suspense>
		</section>
	</Container>
);

const UnauthorizedView = async ({
	code,
	discordMetadata,
	eventData,
}: {
	code: string;
	discordMetadata: DiscordEventMetadata;
	eventData: EventDataWithCtx;
}) => {
	const [creator] = await findUserByEventCode({ code });

	return (
		<Container>
			<section className="w-full">
				<Suspense>
					<SlideIn>
						<EventHeader code={code} title={eventData.title} />
						<DateTimeBlock startUtcMs={eventData.startUtcMs} />
						<p>
							Hosted by <UserAvatar name={creator.name} url={creator.image} />{" "}
							{eventData.hosts || creator.name}
						</p>
						<p>
							Full details are visible to members of{" "}
							<GuildIcon
								name={discordMetadata.name}
								url={discordMetadata.iconUrl}
							/>{" "}
							{discordMetadata.name} on{" "}
							<Link
								className="btn btn-primary btn-sm"
								href="https://www.discord.com"
							>
								<span className="flex h-full w-full items-center gap-2">
									<DiscordIcon className="inline size-4" />
									Discord
								</span>
							</Link>
							.
						</p>
						<p>
							Check with whomever shared the event link for information on how
							to join.
						</p>
					</SlideIn>
				</Suspense>
			</section>
		</Container>
	);
};

const PassedView = ({
	code,
	discordMetadata,
}: {
	code: string;
	discordMetadata?: DiscordEventMetadata;
}) => (
	<Container>
		<EventSection code={code} discordMetadata={discordMetadata} />
		<CommitmentsSection code={code} />
		<AttendeesSection code={code} />
	</Container>
);

const HostView = async ({
	code,
	discordMetadata,
	eventData,
}: {
	code: string;
	discordMetadata?: DiscordEventMetadata;
	eventData: EventDataWithCtx;
}) => (
	<Container>
		<EventSection code={code} discordMetadata={discordMetadata} />
		<div className="flex w-full justify-end md:w-2/12">
			<div className="flex w-full flex-col gap-2 md:w-24">
				<ManageEventSection code={code} eventData={eventData} />
				<RsvpSection
					code={code}
					userId={eventData.createdBy}
					discordMetadata={discordMetadata}
				/>
			</div>
		</div>
		<FoodPlanSection code={code} />
		<AttendeesSection code={code} />
	</Container>
);

const GuestView = async ({
	code,
	userId,
}: {
	code: string;
	userId: string;
}) => (
	<Container>
		<EventSection code={code} />
		<RsvpSection code={code} userId={userId} />
		<FoodPlanSection code={code} />
		<AttendeesSection code={code} />
	</Container>
);

const EventPage = async ({ params }: Props) => {
	const { code } = await params;

	const [event] = await findEvent({ code });

	if (!event) {
		return notFound();
	}

	const session = await auth();

	if (!session?.user?.id) {
		return <LoggedOutView code={code} />;
	}

	const discordMetadata = await fetchDiscordEventMetadata({
		code,
		userId: session.user.id,
	});

	if (discordMetadata && !discordMetadata.isMember) {
		return (
			<UnauthorizedView
				code={code}
				discordMetadata={discordMetadata}
				eventData={event}
			/>
		);
	}

	if (eventIsPassed(event.startUtcMs)) {
		return <PassedView code={code} discordMetadata={discordMetadata} />;
	}

	if (event.createdBy === session.user.id) {
		return (
			<HostView
				code={code}
				eventData={event}
				discordMetadata={discordMetadata}
			/>
		);
	}

	const [rsvpResponse] = await findUserEventRsvp({
		code,
		createdBy: session.user.id,
	});

	if (rsvpResponse?.response === "yes") {
		return <GuestView code={code} userId={session.user.id} />;
	}

	return (
		<Container>
			<EventSection code={code} discordMetadata={discordMetadata} />
			<RsvpSection code={code} userId={session.user.id} />
			<CommitmentsSection code={code} />
			<AttendeesSection code={code} />
		</Container>
	);
};

export default EventPage;
