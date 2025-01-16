import { Suspense } from "react";
import fetchUserDiscordGuilds from "~/actions/bot/fetch-user-discord-guilds";
import { auth } from "~/auth";
import ErrorBoundary from "~/components/error-boundary";
import ManageEventWizard from "~/components/manage-event-wizard";
import { PlanEventFormFallback } from "~/components/plan-event-form";
import genPageMetadata from "~/seo";
import {
	buildEventInputFromParams,
	buildSlotDataFromParams,
} from "~/utilities/build-from-params";

export const metadata = genPageMetadata({ title: "Plan" });

type Props = {
	searchParams: Promise<{ [key: string]: string }>;
};

const PlanPage = async ({ searchParams }: Props) => {
	const session = await auth();
	const loggedIn = Boolean(session?.user?.id);

	return (
		<main className="flex h-full w-full flex-col items-center">
			<ErrorBoundary>
				<Suspense fallback={<PlanEventFormFallback />}>
					<ManageEventWizard
						code={null}
						committedUsersBySlotPromise={Promise.resolve(new Map())}
						eventInputPromise={buildEventInputFromParams(searchParams)}
						loggedIn={loggedIn}
						mode="create"
						slotsPromise={buildSlotDataFromParams(searchParams)}
						userDiscordGuildsPromise={
							session?.user?.id
								? fetchUserDiscordGuilds({ userId: session.user.id })
								: Promise.resolve([])
						}
					/>
				</Suspense>
			</ErrorBoundary>
		</main>
	);
};

export default PlanPage;
