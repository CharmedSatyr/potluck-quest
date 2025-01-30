import { Command, PotluckQuest, PQBot } from "./links";
import Link from "next/link";
import DiscordLogo from "~/components/discord-blurple-logo";

const Commands = () => (
	<article>
		<h3>
			Key <PQBot /> Commands
		</h3>
		<ul>
			<li id="plan-command">
				<code>/plan</code>: Create a new <PotluckQuest /> event directly in your{" "}
				<DiscordLogo /> server. See{" "}
				<Link href="#creating-an-event">Creating an Event</Link>.
			</li>
			<li id="view-command">
				<code>/view</code>: List all <PotluckQuest /> events for your server.
				The response will include your time zone, the name of each event, when
				it will take place, and the event code linked to the <PotluckQuest />{" "}
				event page.
			</li>
			<li id="slots-command">
				<code>
					/slots <span className="rounded bg-base-200 px-1">code</span>
				</code>
				: View and interact with signup slots for a <PotluckQuest /> event for
				which you have a code. If you&apos;re not sure of the code for an event,
				type <Command command="view" />. See <Link href="#slots">Slots</Link>.
			</li>
		</ul>
	</article>
);

export default Commands;
