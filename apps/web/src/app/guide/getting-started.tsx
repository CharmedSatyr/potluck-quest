import Link from "next/link";
import { Command, SignupSlots } from "~/app/guide/links";
import TabWrapper from "~/app/guide/tab-wrapper";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import OpenAiLogo from "~/components/branding/openai-white-logo";
import { PotluckQuest } from "~/components/branding/potluck-quest-logo";
import { PQBot } from "~/components/branding/pq-bot-logo";

const GettingStartedWithBot = () => (
	<article>
		<p>
			<PQBot /> allows you to plan and manage events entirely within{" "}
			<DiscordLogo />, with the <PotluckQuest /> web interface available for
			creating <SignupSlots /> and extra features.
		</p>
		<ol>
			<li>
				Invite <PQBot /> to your server.
			</li>
			<li>
				Use <Command command="plan" /> to create an event. (You may be prompted
				to sign in to <PotluckQuest /> your first time.)
			</li>

			<li>
				<PQBot /> will announce the event to the channel and send you a link to
				create <SignupSlots /> for your event.
			</li>
			<li>
				Once <SignupSlots /> are ready, guests can type{" "}
				<Command command="slots" /> followed by the event code in{" "}
				<DiscordLogo />, and click on what they&apos;d like to bring.
			</li>
			<li>
				The event can be managed like any other <DiscordLogo /> event.
			</li>
		</ol>
	</article>
);

const GettingStartedWithWeb = () => (
	<article>
		<p>
			The <PotluckQuest /> web interface provides all the tools you need to plan
			a potluck meal.
		</p>

		<ol>
			<li>
				Visit <PotluckQuest />.
			</li>
			<li>
				Sign in with your <DiscordLogo /> account.
			</li>
			<li>
				Click <Link href="/plan">Create Event</Link> and begin filling out the
				details.
			</li>
			<li>
				Add <SignupSlots /> to your event using <OpenAiLogo /> suggestions, or
				customize them yourself.
			</li>
			<li>
				Share the event link with participants, who can sign up to bring
				something on the event page.
			</li>
		</ol>
	</article>
);

const GettingStarted = () => (
	<TabWrapper bot={<GettingStartedWithBot />} web={<GettingStartedWithWeb />} />
);

export default GettingStarted;
