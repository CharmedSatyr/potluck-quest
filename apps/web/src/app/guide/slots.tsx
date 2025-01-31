import { Command, PotluckQuest, PQBot } from "./links";
import Link from "next/link";
import DiscordLogo from "~/components/discord-blurple-logo";
import OpenAiLogo from "~/components/openai-white-logo";

const Slots = () => (
	<article>
		<ul>
			<li>
				Signup slots are how <PotluckQuest /> helps hosts plan meals and guests
				decide what to bring.
			</li>
			<li>
				A slot represents a request for a specific type and number of item—e.g.,
				a main course, appetizers, drinks, or packages of paper plates.
			</li>
			<li>
				<PotluckQuest />
				&apos;s <OpenAiLogo /> integration can help you determine what you need
				to support the number of attendees you expect at your event.
			</li>
		</ul>

		<section>
			<h3 id="managing-slots">Managing Slots</h3>
			<ul>
				<li>
					Event creators are able to add, delete, or modify slots in the
					&quot;Plan the Food&quot; step of the wizard while{" "}
					<Link href="#creating-an-event">creating </Link> or{" "}
					<Link href="#editing-and-deleting-events">editing</Link> an event on
					the <PotluckQuest /> web interface.
				</li>
				<li>
					<PQBot />: You should receive a <DiscordLogo /> channel message that
					links to slot management immediately after you{" "}
					<Link href="#creating-an-event">create an event</Link>. If you need
					the link again, navigate to your event&apos;s <PotluckQuest /> page,
					click &quot;Edit&quot;, and continue to &quot;Plan the Food&quot;.
				</li>
				<li>
					To complete a slot in the wizard, fill in &quot;What&apos;s
					Needed&quot; with the item you want and set the number for
					&quot;Signups Needed&quot;.
				</li>
				<li>
					Click &quot;Add Slot&quot; to add and customize additional slots, or
					the &quot;✕&quot; button to the left of the slot to delete it.
				</li>
				<li>
					All slots must have an item and quantity set before you continue.
				</li>
				<li>
					If you&apos;re not sure what you need, <OpenAiLogo /> can suggest
					items and quantities based on your event details and the number of
					attendees. To get suggestions:
					<ol>
						<li>
							Type the number of expected attendees in the box under &quot;Need
							help planning your meal?&quot; and click &quot;Ask AI&quot;.
						</li>
						<li>
							Click &quot;Use Suggestions&quot; to automagically populate your
							slots, or click &quot;Reset&quot; to start over.
						</li>
						<li>
							You can edit the the suggestions as needed before continuing.
						</li>
					</ol>
				</li>
				<li>
					Use of <OpenAiLogo /> suggestions is completely optional. The only
					information shared is the number of attendees and the details
					you&apos;ve entered for the event you&apos;re planning.
				</li>
			</ul>
		</section>

		<section>
			<h3 id="signing-up-to-bring-something">Signing Up to Bring Something</h3>
			<ul>
				<li>
					Users with access to the <PotluckQuest /> event page can use the
					built-in tools to see what&apos;s already on the menu and sign up to
					bring a particular quantity of an item, optionally leaving a note with
					more details.
				</li>
				<li>
					To remove a commitment, navigate to the <PotluckQuest /> event page
					and click the &quot;✕&quot; button next to it in the &quot;On the
					Menu&quot; section.
				</li>
				<li>
					<PQBot />: In your <DiscordLogo /> server, use the{" "}
					<Command command="slots" /> command to see what&apos;s been requested
					and how many signups are still needed. Clicking something will sign
					you up to bring one, and <PQBot /> will make an announcement to the
					channel. If you want to bring more than one of an item, repeat the
					process or manage your commitments on the <PotluckQuest /> event page.
				</li>

				<li>
					<PQBot />: Changes to commitments on the <PotluckQuest /> event page
					will accounted for the next time somebody uses the{" "}
					<Command command="slots" /> command in <DiscordLogo />.
				</li>
			</ul>
		</section>
	</article>
);

export default Slots;
