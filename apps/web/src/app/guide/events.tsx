import Link from "next/link";
import { Command, PotluckQuest, PQBot } from "~/app/guide/links";
import TabWrapper from "~/app/guide/tab-wrapper";
import DiscordLogo from "~/components/discord-blurple-logo";

const CreatingEventBot = () => (
	<ul>
		<li>
			<PQBot /> creates <DiscordLogo />
			-native{" "}
			<Link
				href="https://support.discord.com/hc/en-us/articles/4409494125719-Scheduled-Events"
				rel="noopener noreferrer"
				target="_blank"
			>
				Scheduled Events
			</Link>{" "}
			that are linked to <PotluckQuest /> event codes and pages.
		</li>
		<li>
			Each <PotluckQuest /> event can be associated with one <DiscordLogo />{" "}
			server.
		</li>
		<li>
			You cannot add or change the <DiscordLogo /> server an event is associated
			with after the event has been created.
		</li>
		<li>
			Use <Command command="plan" /> in the channel you want related messages in
			to launch a form for event details. Times are parsed based on the timezone
			you&apos;ve set on the <Link href="/settings">Settings</Link> page.
		</li>
		<li>
			<PQBot /> will create events on <PotluckQuest /> and <DiscordLogo /> and
			announce the event in the channel in which it was created. It will also
			try to add the event&apos;s code to the event description for easy access.
		</li>
		<li>
			If you&apos;d rather use the <PotluckQuest /> web interface to create an
			event, you can associate your event with a <DiscordLogo /> server in the
			last step of the <Link href="/plan">planning wizard</Link>. For a server
			to be available:
			<ol>
				<li>
					<PQBot /> must be installed in that server.
				</li>
				<li>
					You must have appropriate{" "}
					<Link
						href="https://support.discord.com/hc/en-us/articles/4409494125719-Scheduled-Events#docs-internal-guid-69d2b52d-7fff-d89d-5468-6f4c2771dd27"
						target="_blank"
						rel="noopener noreferrer"
					>
						event permissions
					</Link>{" "}
					to create an event in that server.
				</li>
			</ol>
		</li>
		<li>
			Any events associated with a <DiscordLogo /> server will be visible{" "}
			<strong>only to members of that server</strong> on the <PotluckQuest />{" "}
			web interface.
		</li>
		<li>
			Some <DiscordLogo /> event functionality, like cover images and repeating
			events, is not yet available on <PotluckQuest />.
		</li>
	</ul>
);

const CreatingEventWeb = () => (
	<ul>
		<li>
			Navigate to the <Link href="/plan">planning wizard</Link> and fill in the
			details!
		</li>
		<li>
			Events are created in the timezone currently detected on your system.
		</li>
		<li>
			If you are not using <PQBot />, select &quot;None&quot; when prompted to
			associate your event with a server.
		</li>
		<li>
			Once your event has been created, you can share the code on the event page
			with friends or click it to copy a shareable link to the page.
		</li>
		<li>
			Events created without an associated <DiscordLogo /> server are visible to{" "}
			<strong>
				any logged-in <PotluckQuest /> user who has the event code
			</strong>
			.
		</li>
	</ul>
);

const CreatingEventTabs = () => (
	<TabWrapper bot={<CreatingEventBot />} web={<CreatingEventWeb />} />
);

const ManagingEvents = () => (
	<article>
		<ul>
			<li>
				Each <PotluckQuest /> event has a unique, five-character, alphanumeric
				code on the <PotluckQuest /> website.
			</li>

			<li>
				Add <Link href="#slots">signup slots</Link> to your event during event
				creation so guests can take advantage of <PotluckQuest /> meal planning
				tools.
			</li>
		</ul>

		<section>
			<h3 id="creating-an-event">Creating an Event</h3>
			<CreatingEventTabs />
		</section>

		<section>
			<h3 id="finding-an-event">Finding an Event</h3>
			<ul>
				<li>
					If you have an event code, you can enter it in the search box on the{" "}
					<Link href="/">home page</Link> to be redirected to the associated
					event.
				</li>
				<li>
					You can visit your <Link href="/dashboard">Dashboard</Link> to see all
					the events you&apos;ve created or joined.
				</li>
				<li>
					<PQBot />: Use <Command command="view" /> to see all <PotluckQuest />{" "}
					events on your <DiscordLogo /> server, along with their codes and
					links to their event pages.
				</li>
			</ul>
		</section>

		<section>
			<h3 id="editing-and-deleting-events">Editing and Deleting Events</h3>

			<ul>
				<li>
					Edit and delete capabilities are available to event hosts from the{" "}
					<PotluckQuest /> event page and the{" "}
					<Link href="/dashboard">Dashboard</Link>.
				</li>
				<li>
					Event creators can manage <Link href="#slots">signup slots</Link> by
					clicking on the &quot;Edit&quot; button on the <PotluckQuest /> event
					page and proceeding to the &quot;Plan the Food&quot; step of the
					wizard.
				</li>
				<li>
					<PQBot />: Scheduled events in <DiscordLogo /> can be modified or
					canceled by anyone with{" "}
					<Link
						href="https://support.discord.com/hc/en-us/articles/4409494125719-Scheduled-Events#docs-internal-guid-69d2b52d-7fff-d89d-5468-6f4c2771dd27"
						target="_blank"
						rel="noopener noreferrer"
					>
						event permissions
					</Link>{" "}
					for that server.
				</li>
				<li>
					<PQBot />: <PotluckQuest /> events are seamlessly synced with their
					associated events on <DiscordLogo />. Events modified or canceled on{" "}
					<DiscordLogo /> will be permanently changed or deleted on the{" "}
					<PotluckQuest /> website, and vice versa.
				</li>
			</ul>
		</section>
	</article>
);

export default ManagingEvents;
