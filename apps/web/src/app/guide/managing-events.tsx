import { Command, PotluckQuest, PQBot } from "./links";
import TabWrapper from "./tab-wrapper";
import Link from "next/link";
import DiscordLogo from "~/components/discord-blurple-logo";

const ManagingEventsWithBot = () => (
	<article>
		<p>
			<PQBot /> creates native{" "}
			<Link
				href="https://support.discord.com/hc/en-us/articles/4409494125719-Scheduled-Events"
				rel="noopener noreferrer"
				target="_blank"
			>
				Discord Scheduled Events
			</Link>{" "}
			that are linked to unique, five-character, alphanumeric codes on the{" "}
			<PotluckQuest /> website. You can manage events from the website or{" "}
			<DiscordLogo />, and the details will remain synced.
		</p>

		<section>
			<h4 id="creating-an-event">Creating an Event</h4>
			<ul>
				<li>
					Use <code>/plan</code> to launch a form in which you can fill out
					event details. Times are parsed based on the timezone you&apos;ve set
					on the <Link href="/settings">Settings</Link> page.
				</li>
				<li>
					<PQBot /> will create events on <PotluckQuest /> and <DiscordLogo />{" "}
					and announce the event in the channel in which it was created. It will
					also add the event&apos;s code to the event description for easy
					access.
				</li>{" "}
				<li>
					If you&apos;d rather use the <PotluckQuest /> web interface to create
					an event, you can associate your event with any server that you are
					allowed to create an event in and that has <PQBot /> installed. Simply
					select the server you want linked in the last step of the{" "}
					<Link href="/plan">planning wizard</Link>.
				</li>
				<li>
					Any events associated with a <DiscordLogo /> server will be visible{" "}
					<strong>only to members of that server</strong> on the{" "}
					<PotluckQuest /> web interface.
				</li>
				<li>
					You cannot change the server an event is associated with once
					it&apos;s been created.
				</li>
				<li>
					Some <DiscordLogo /> event functionality, like cover images and
					repeating events, is not yet available on <PotluckQuest />.
				</li>
			</ul>
		</section>

		<section>
			<h4 id="finding-an-event">Finding an Event</h4>
			<ul>
				<li>
					Use <Command command="view" /> to see all <PotluckQuest /> events on
					your <DiscordLogo /> server, along with their codes and links to their
					pages on the website.
				</li>
				<li>
					You can also visit your <Link href="/dashboard">Dashboard</Link> on
					the website to see all the events you&apos;ve created or joined.
				</li>
				<li>
					If you have an event code, you can enter it in the search box on the{" "}
					<Link href="/">home page</Link> to be redirected to the associated
					event.
				</li>
			</ul>
		</section>

		<section>
			<h4 id="editing-and-deleting-events">Editing and Deleting Events</h4>

			<ul>
				<li>
					You can modify or cancel events using Discord&apos;s native tools or
					the associated <PotluckQuest /> event page.
				</li>
				<li>
					Edit and delete capabilities are also available from your{" "}
					<Link href="/dashboard">Dashboard</Link>.
				</li>
				<li>
					Events modified or canceled on <DiscordLogo /> will be permanently
					changed or deleted on the <PotluckQuest /> website, and vice versa.
				</li>
			</ul>
		</section>
	</article>
);

const ManagingEventsWithWeb = () => (
	<article>
		<section>
			<h4>Finding an Event</h4>
			<ul>
				<li>Use the event code form on the homepage to locate an event.</li>
				<li>
					Log in and navigate to your <code>/dashboard</code> to view all your
					events.
				</li>
			</ul>
		</section>

		<section>
			<h4>Creating an Event</h4>
			<p>
				Fill out the event creation form, including the event name, date, time,
				and description. Use AI to suggest dishes and customize the slots before
				finalizing. Events created without linking to a Discord server can be
				accessed by anyone with the event code.
			</p>
		</section>

		<section>
			<h4>Editing or Deleting Events</h4>
			<p>
				Access your Dashboard to manage your events. Click &quot;Edit&quot; or
				&quot;Delete&quot; for any event you&apos;ve created. Only the event
				creator can make changes.
			</p>
		</section>
	</article>
);

const ManagingEvents = () => (
	<TabWrapper
		bot={<ManagingEventsWithBot />}
		botHeading="BOT"
		web={<ManagingEventsWithWeb />}
		webHeading="WEB"
	/>
);

export default ManagingEvents;
