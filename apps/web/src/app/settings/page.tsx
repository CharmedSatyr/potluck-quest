import { Suspense } from "react";
import findTimezone from "~/actions/settings/find-timezone";
import { auth } from "~/auth";
import SetupTimezone from "~/components/setup-timezone";
import TimezoneSelector from "~/components/timezone-selector";
import { DEFAULT_TIMEZONE } from "~/constants/timezone";
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
		<section className="w-full">
			<h1 className="text-primary">Settings</h1>
			{setup && <h2>Initial setup Complete! You may return to Discord.</h2>}

			{!result && <SetupTimezone />}

			<div>
				<Suspense fallback="Loading...">
					Your <span className="font-bold">preferred timezone</span> is{" "}
					<TimezoneSelector
						currentTimezone={result?.timezone ?? DEFAULT_TIMEZONE}
					/>
					.
					<p>
						This setting is used when your local timezone isn&apos;t recognized.
					</p>
				</Suspense>
			</div>
		</section>
	);
};

export default SettingsPage;
