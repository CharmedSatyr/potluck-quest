import { DEFAULT_TIMEZONE } from "@potluck/utilities/constants";
import { Suspense } from "react";
import findTimezone from "~/actions/settings/find-timezone";
import { auth } from "~/auth";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import { PQBot } from "~/components/branding/pq-bot-logo";
import SetupTimezone from "~/components/setup-timezone";
import SlideIn from "~/components/slide-in";
import TimezoneSelector from "~/components/timezone-selector";
import genPageMetadata from "~/seo";

export const metadata = genPageMetadata({ title: "Settings" });

type Props = {
	searchParams: Promise<{ [key: string]: string }>;
};

/**
 * The landing page for users coming from the Discord bot for initial setup.
 * The timezone setting is only used in the Discord bot. The website uses detected local time.
 */
const SettingsPage = async ({ searchParams }: Props) => {
	const { setup } = await searchParams;

	const session = await auth();

	const [result] = await findTimezone({ userId: session!.user!.id! }); // Guaranteed by middleware

	return (
		<main className="contrast-container">
			<h1 className="text-primary-gradient">Settings</h1>
			{setup && <h2>Initial setup Complete! You may return to Discord.</h2>}

			{!result && <SetupTimezone />}

			<Suspense>
				<SlideIn>
					Your <span className="font-bold">preferred timezone</span> is{" "}
					<TimezoneSelector
						currentTimezone={result?.timezone ?? DEFAULT_TIMEZONE}
					/>
					.
				</SlideIn>
			</Suspense>

			<p>
				<PQBot /> uses this setting on <DiscordLogo />.
			</p>
		</main>
	);
};

export default SettingsPage;
