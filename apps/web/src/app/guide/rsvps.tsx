import { PotluckQuest, PQBot } from "./links";
import DiscordLogo from "~/components/discord-blurple-logo";

const Rsvps = () => (
	<article>
		<ul>
			<li>
				RSVPs can be managed by clicking &quot;Attending&quot; or &quot;Not
				Attending&quot; on the <PotluckQuest /> event page.
			</li>
			<li>
				<PQBot />: Participants can RSVP within <DiscordLogo /> by clicking
				&quot;Interested&quot; on the server event. This status is synced to the{" "}
				<PotluckQuest /> web interface.
			</li>
			<li>
				<PQBot />: Any changes to RSVPs on the <PotluckQuest /> web interface
				are synced to their associated <DiscordLogo /> event.
			</li>
		</ul>
	</article>
);

export default Rsvps;
