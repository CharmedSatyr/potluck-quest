import { Command, PotluckQuest, PQBot, SignupSlots } from "./links";
import TabWrapper from "./tab-wrapper";
import Link from "next/link";
import DiscordLogo from "~/components/discord-blurple-logo";

const GettingStartedWithBot = () => (
	<article>
		<p>
			<PQBot /> allows you to plan and manage events entirely within{" "}
			<DiscordLogo />, with the <PotluckQuest /> web interface available for
			slot creation and extra features.
		</p>
		<p>
			<PQBot /> is designed for{" "}
			<Link
				href="https://support.discord.com/hc/en-us/articles/14078261239831-Clarifying-Server-Types#h_01H1W0A6Y2FN2P05CD7WD96RF8"
				rel="noopener noreferrer"
				target="_blank"
			>
				Friend Servers
			</Link>{" "}
			connecting people who want to spend time together IRL.
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
				<DiscordLogo /> and click on what they&apos;d like to bring.
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
			The standalone <PotluckQuest /> web interface provides a complete potluck
			planning experience without needing to use the <DiscordLogo /> client.
		</p>

		<ol>
			<li>
				Visit <PotluckQuest />.
			</li>
			<li>
				Sign in with your <DiscordLogo /> account.
			</li>
			<li>Click &quot;Create Event&quot; to set up your potluck.</li>
			<li>
				Add slots to your event using AI suggestions or customize them yourself.
			</li>
			<li>Share the event link with participants.</li>
		</ol>
	</article>
);

const GettingStarted = () => (
	<TabWrapper
		bot={<GettingStartedWithBot />}
		botHeading="With PQ Bot on Discord"
		web={<GettingStartedWithWeb />}
		webHeading="Standalone Web Interface"
	/>
);

export default GettingStarted;
