import { PotluckQuest, PQBot } from "~/app/guide/links";
import DiscordLogo from "~/components/discord-blurple-logo";

const Rsvps = () => (
	<article>
		<ul>
			<li>
				You can manage your RSVP from the <PotluckQuest /> event page. You may
				be redirected to <DiscordLogo /> if your event is associated with a
				server.
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
