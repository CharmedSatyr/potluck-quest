import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";
import fetchDiscordEventMetadata, {
	type DiscordEventMetadata,
} from "~/actions/bot/event/fetch-discord-event-metadata";
import findEvent from "~/actions/event/find-event";
import findAttendingCount from "~/actions/rsvp/find-attending-count";
import findUserEventRsvp from "~/actions/rsvp/find-user-event-rsvp";
import findUserByEventCode from "~/actions/user/find-user-by-event-code";
import EditLink from "~/app/event/[code]/edit-link";
import { auth } from "~/auth";
import AttendeesList from "~/components/attendees-list";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import CurrentMenuList from "~/components/current-menu-list";
import DeleteEventForm from "~/components/delete-event-button";
import DateTimeBlock from "~/components/event-skeleton/date-time-block";
import EventSkeleton, {
	EventHeader,
	EventSkeletonFallback,
} from "~/components/event-skeleton/event-skeleton";
import GuildLink from "~/components/guild-link";
import RsvpForm from "~/components/rsvp-form";
import SlideIn from "~/components/slide-in";
import SlotManager from "~/components/slot-manager";
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

const CommitmentsSection = async ({ code }: { code: string }) => {
	return (
		<section className="w-full">
			<Suspense>
				<SlideIn>
					<h2 className="m-0 p-0">
						On the Menu{" "}
						<span className="badge badge-sm badge-info">
							RSVP to Add Your Item
						</span>
					</h2>
					<CurrentMenuList code={code} />
				</SlideIn>
			</Suspense>
		</section>
	);
};

const AttendeesSection = async ({ code }: { code: string }) => {
	const [totalAttendees] = await findAttendingCount({ code });

	return (
		<section className="w-full">
			<Suspense>
				<SlideIn>
					<h2>
						Attendees{" "}
						<span className="badge badge-sm badge-info">
							{totalAttendees?.count}
						</span>
					</h2>
					<AttendeesList code={code} />
				</SlideIn>
			</Suspense>
		</section>
	);
};

const ManageEventSection = ({
	code,
	eventData,
}: {
	code: string;
	eventData: EventDataWithCtx;
}) => {
	return (
		<section className="w-full">
			<Suspense>
				<SlideIn>
					<div className="flex w-full flex-col gap-2">
						<EditLink code={code} eventData={eventData} />
						<DeleteEventForm code={code} redirect={true} />
					</div>
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
}) => {
	return (
		<section className="w-full">
			<Suspense>
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
};

const FoodPlanSection = ({ code }: { code: string }) => {
	return (
		<section className="w-full">
			{/* This fallback is simply filling out the contrast container. */}
			<Suspense fallback={<div className="h-screen" />}>
				<SlideIn>
					<h2>On the Menu</h2>
					<SlotManager code={code} />
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
							<GuildLink discordMetadata={discordMetadata} /> on <DiscordLogo />
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
	isHost,
}: {
	code: string;
	discordMetadata?: DiscordEventMetadata;
	isHost: boolean;
}) => (
	<Container>
		<EventSection code={code} discordMetadata={discordMetadata} />
		{isHost && (
			<div className="mt-2 flex w-full justify-end md:mt-0 md:w-2/12">
				<div className="flex w-full flex-col gap-2 md:mt-2 md:w-22">
					<DeleteEventForm code={code} redirect={true} />
				</div>
			</div>
		)}

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
			<div className="flex w-full flex-col gap-2 md:mt-2 md:w-22">
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

const AttendingView = async ({
	code,
	discordMetadata,
	userId,
}: {
	code: string;
	discordMetadata?: DiscordEventMetadata;
	userId: string;
}) => (
	<Container>
		<EventSection code={code} />
		<div className="flex w-full justify-end md:w-2/12">
			<div className="flex w-full flex-col md:mt-2 md:w-22">
				<RsvpSection
					code={code}
					userId={userId}
					discordMetadata={discordMetadata}
				/>
			</div>
		</div>
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
		return (
			<PassedView
				code={code}
				discordMetadata={discordMetadata}
				isHost={event.createdBy === session.user.id}
			/>
		);
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
		return (
			<AttendingView
				code={code}
				userId={session.user.id}
				discordMetadata={discordMetadata}
			/>
		);
	}

	// No RSVP or Not Attending View
	return (
		<Container>
			<EventSection code={code} discordMetadata={discordMetadata} />
			<div className="flex w-full justify-end md:w-2/12">
				<div className="flex w-full flex-col md:mt-2 md:w-22">
					<RsvpSection
						code={code}
						userId={session.user.id}
						discordMetadata={discordMetadata}
					/>
				</div>
			</div>
			<CommitmentsSection code={code} />
			<AttendeesSection code={code} />
		</Container>
	);
};

export default EventPage;
