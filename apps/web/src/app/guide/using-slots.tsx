import { PotluckQuest } from "./links";
import Link from "next/link";
import DiscordLogo from "~/components/discord-blurple-logo";
import OpenAiLogo from "~/components/openai-white-logo";

const UsingSlots = () => (
	<article>
		<p>
			Signup slots are how <PotluckQuest /> helps you plan meals. A slot
			represents a request for a specific type and number of item—e.g., main
			course, appetizers, drinks, or packages of paper plates. <OpenAiLogo />{" "}
			can help you determine what you need to support the number of attendees
			you expect at your event.
		</p>

		<section>
			<h3>Creating Slots</h3>
			<ul>
				<li>
					The <Link href="/plan">planning wizard</Link> of <PotluckQuest /> is
					where you create and customize signup slots. <OpenAiLogo /> can
					suggest dish types and quantities based on your event details and the
					number of attendees.
				</li>
				<li>
					Use of <OpenAiLogo /> suggestions is completely optional. The only
					information shared is the number of attendees and the details of the
					event you&apos;re planning.
				</li>
			</ul>
		</section>

		<section>
			<h3>Signing Up for Slots</h3>
			<ul>
				<li>
					Use <code>/slots</code> in your <DiscordLogo /> server to view
					available slots and sign up.
				</li>
				<li>
					Participants can also sign up for slots directly on the{" "}
					<PotluckQuest /> web interface via the event page.
				</li>
			</ul>
		</section>
	</article>
);

export default UsingSlots;
