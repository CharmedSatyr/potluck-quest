import { PotluckQuest } from "./links";
import DiscordLogo from "~/components/discord-blurple-logo";

const Rsvps = () => (
	<article>
		<ul>
			<li>
				Participants can RSVP within <DiscordLogo /> by clicking
				&quot;Interested&quot; on the native event. This status is synced to the{" "}
				<PotluckQuest /> web interface.
			</li>
			<li>
				On the web interface, RSVPs can be managed by clicking
				&quot;Attending&quot; or &quot;Not Attending&quot; on the event page.
				This information will be synced to the connected <DiscordLogo /> event.
			</li>
		</ul>
	</article>
);

export default Rsvps;
