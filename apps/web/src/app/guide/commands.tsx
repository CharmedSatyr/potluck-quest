import { Command } from "./links";
import Link from "next/link";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import { PotluckQuest } from "~/components/branding/potluck-quest-logo";
import { PQBot } from "~/components/branding/pq-bot-logo";

const Commands = () => (
	<article>
		<h3>
			Key <PQBot /> Commands
		</h3>
		<p>
			These{" "}
			<Link
				href="https://support-apps.discord.com/hc/en-us/articles/26501837786775-Slash-Commands-FAQ"
				target="_blank"
				rel="noopener noreferrer"
			>
				slash commands
			</Link>{" "}
			should be typed directly in the <DiscordLogo /> channel in which you want{" "}
			<PQBot /> to send response messages.
		</p>
		<ul>
			<li id="plan-command">
				<code className="not-prose">/plan</code>: Create a new <PotluckQuest />{" "}
				event directly in your <DiscordLogo /> server. This command will send a
				message to the channel once the event has been created. It will also
				send you an{" "}
				<Link
					href="https://support-apps.discord.com/hc/en-us/articles/26501839512855-Ephemeral-Messages-FAQ"
					target="_blank"
					rel="noopener noreferrer"
				>
					ephemeral message
				</Link>{" "}
				with a link to create signup slots. See{" "}
				<Link href="#creating-an-event">creating an event</Link> and{" "}
				<Link href="#managing-slots">managing slots</Link>.
			</li>
			<li id="view-command">
				<code className="not-prose">/view</code>: Publicly list all{" "}
				<PotluckQuest /> events for the server. The response will include your
				preferred time zone (see <Link href="/settings">Settings</Link>), the
				name of each event, when it will take place, and each event code linked
				to its <PotluckQuest /> page.
			</li>
			<li id="slots-command">
				<code className="not-prose">
					/slots <span className="bg-base-200 rounded-sm px-1">code</span>
				</code>
				: View and interact with signup slots for a <PotluckQuest /> event for
				which you have a code. If you&apos;re not sure of the code for an event,
				type <Command command="view" />. The response will include buttons with
				the names of requested items and the number still needed. Click to sign
				up to bring one of that item. Your commitment will be shared with the
				channel. See <Link href="#slots">Slots</Link>.
			</li>
		</ul>
	</article>
);

export default Commands;
