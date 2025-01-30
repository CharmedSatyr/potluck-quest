import { PotluckQuest } from "./links";

const Commands = () => (
	<article>
		<h3>Key Discord Commands</h3>
		<ul>
			<li>
				<code>/plan</code>: Create a new event directly in Discord.
			</li>
			<li>
				<code>/view</code>: List all <PotluckQuest /> events for your server.
			</li>
			<li>
				<code>/slots</code>: View and interact with signup slots for an event.
			</li>
		</ul>
	</article>
);

export default Commands;
