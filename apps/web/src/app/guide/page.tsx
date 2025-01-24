import Link from "next/link";
import { JSX } from "react";
import DiscordLogo from "~/components/discord-blurple-logo";
import OpenAiLogo from "~/components/openai-white-logo";
import { BOT_INSTALL_LINK } from "~/constants/bot-install-link";

const PQBot = () => (
	<Link
		className="no-underline"
		href={BOT_INSTALL_LINK}
		target="_blank"
		rel="noopener noreferrer"
	>
		<span className="text-secondary">PQ Bot</span>
	</Link>
);

const PotluckQuest = () => (
	<Link className="no-underline" href="/">
		<span className="text-primary-gradient">Potluck Quest</span>
	</Link>
);
const Command = ({ command }: { command: "plan" | "view" | "slots" }) => (
	<Link href="#">
		<code>/{command}</code>
	</Link>
);
const SignupSlots = () => <Link href="#">signup slots</Link>;

const WithBotContent = () => {
	return (
		<section>
			<h2 className="mt-2">
				Using <PotluckQuest /> with <PQBot /> on <DiscordLogo width={110} />
			</h2>
			<p>
				<PQBot />, our Discord bot, allows you to plan and manage events
				entirely within Discord, with the <PotluckQuest /> web interface
				available for slot creation and extra features.
			</p>
			<p>
				<PQBot /> is designed for{" "}
				<Link
					href="https://support.discord.com/hc/en-us/articles/14078261239831-Clarifying-Server-Types#h_01H1W0A6Y2FN2P05CD7WD96RF8"
					rel="noopener noreferrer"
					target="_blank"
				>
					Friend Servers
				</Link>{" "}
				connecting people who spend time together IRL.
			</p>

			<article>
				<h3>Getting Started</h3>
				<ol>
					<li>
						Invite <PQBot /> to your server.
					</li>
					<li>
						Use <Command command="plan" /> to create an event. (You may be
						prompted to sign in to <PotluckQuest /> your first time.)
					</li>

					<li>
						<PQBot /> will announce the event to the channel and send you a link
						to create <SignupSlots /> for your event.
					</li>
					<li>
						Once <SignupSlots /> are ready, guests can type{" "}
						<Command command="slots" /> followed by the event code in Discord
						and click on what they&apos;d like to bring.
					</li>
					<li>
						The event will function and can be managed like any other Discord
						event.
					</li>
				</ol>
			</article>

			<article>
				<h3 id="managing-events">Managing Events</h3>
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
					<PotluckQuest /> website. You can manage events from the website or
					Discord, and the details will remain synced.
				</p>

				<section>
					<h4 id="creating-an-event">Creating an Event</h4>
					<ul>
						<li>
							Use <code>/plan</code> to launch a form in which you can fill out
							event details. Times are parsed based on the timezone you&apos;ve
							set on the <Link href="/settings">Settings</Link> page.
						</li>
						<li>
							<PQBot /> will create events on <PotluckQuest /> and Discord and
							announce the event in the channel in which it was created. It will
							also add the event&apos;s code to the event description for easy
							access.
						</li>{" "}
						<li>
							If you&apos;d rather use the <PotluckQuest /> web interface to
							create an event, you can associate your event with any server that
							you are allowed to create an event in and that has <PQBot />{" "}
							installed. Simply select the server you want linked in the last
							step of the planning wizard.
						</li>
						<li>
							Any events associated with a Discord server will be visible{" "}
							<strong>only to members of that server</strong> on the{" "}
							<PotluckQuest /> web interface.
						</li>
						<li>
							You cannot change the server an event is associated with once
							it&apos;s been created.
						</li>
						<li>
							Some Discord event functionality, like cover images and repeating
							events, is not yet available on <PotluckQuest />.
						</li>
					</ul>
				</section>

				<section>
					<h4 id="finding-an-event">Finding an Event</h4>
					<ul>
						<li>
							Use <Command command="view" /> to see all <PotluckQuest /> events
							on your Discord server, along with their codes and links to their
							pages on the website.
						</li>
						<li>
							You can also visit your <Link href="/dashboard">Dashboard</Link>{" "}
							on the website to see all the events you&apos;ve created or
							joined.
						</li>
						<li>
							If you have an event code, you can enter it in the search box on
							the <Link href="/">home page</Link> to be redirected to the
							associated event.
						</li>
					</ul>
				</section>

				<section>
					<h4 id="editing-and-deleting-events">Editing and Deleting Events</h4>

					<ul>
						<li>
							You can modify or cancel events using Discord&apos;s native tools
							or the associated <PotluckQuest /> event page.
						</li>
						<li>
							Edit and delete capabilities are also available from your{" "}
							<Link href="/dashboard">Dashboard</Link>.
						</li>
						<li>
							Events modified on Discord will be permanently changed on the{" "}
							<PotluckQuest /> website, and vice versa.
						</li>
						<li>
							Events canceled on Discord will be permanently deleted on the{" "}
							<PotluckQuest /> website, and vice versa.
						</li>
					</ul>
				</section>
			</article>

			<article>
				<h3>Using Slots</h3>
				<p>
					Signup slots are central to the functionality of <PotluckQuest />.
				</p>

				<section>
					<h4>Creating Slots</h4>
					<ul>
						<li>
							Use the web interface to create and customize signup slots.{" "}
							<OpenAiLogo /> can suggest dish types and quantities based on your
							event details and the number of attendees.
						</li>
						<li>
							Use of <OpenAiLogo /> suggestions is completely optional, and only
							information you choose to include in your event details is sent
							when requesting slot suggestions.
						</li>
					</ul>
				</section>

				<section>
					<h4>Signing Up for Slots</h4>
					<ul>
						<li>
							<strong>Discord:</strong> Use <code>/slots</code> to view
							available slots and sign up without leaving Discord.
						</li>
						<li>
							<strong>Website:</strong> Participants can also sign up for slots
							directly via the event link.
						</li>
					</ul>
				</section>
			</article>

			<article>
				<h3>RSVPs</h3>
				<p>
					Participants can RSVP within Discord by clicking
					&quot;Interested&quot; on the native event. This status is synced to
					the <PotluckQuest /> web interface. On the web interface, RSVPs can be
					managed by clicking &quot;Attending&quot; or &quot;Not Attending&quot;
					on the event page.
				</p>
			</article>

			<article>
				<h3>Key Discord Commands</h3>
				<ul>
					<li>
						<code>/plan</code>: Create a new event directly in Discord.
					</li>
					<li>
						<code>/view</code>: List all <PotluckQuest /> events for your
						server.
					</li>
					<li>
						<code>/slots</code>: View and interact with signup slots for an
						event.
					</li>
				</ul>
			</article>
		</section>
	);
};

const WebOnlyContent = () => {
	return (
		<section>
			<h2>Web Interface Only</h2>
			<p>
				The standalone <PotluckQuest /> web interface provides a complete
				potluck planning experience without the need for Discord.
			</p>

			<article>
				<h3>Getting Started</h3>
				<ol>
					<li>
						Visit <PotluckQuest />.
					</li>
					<li>Sign in with your Discord account.</li>
					<li>Click &quot;Create Event&quot; to set up your potluck.</li>
					<li>
						Add slots to your event using AI suggestions or customize them
						yourself.
					</li>
					<li>Share the event link with participants.</li>
				</ol>
			</article>

			<article>
				<h3>Managing Events</h3>
				<section>
					<h4>Finding an Event</h4>
					<ul>
						<li>Use the event code form on the homepage to locate an event.</li>
						<li>
							Log in and navigate to your <code>/dashboard</code> to view all
							your events.
						</li>
					</ul>
				</section>

				<section>
					<h4>Creating an Event</h4>
					<p>
						Fill out the event creation form, including the event name, date,
						time, and description. Use AI to suggest dishes and customize the
						slots before finalizing. Events created without linking to a Discord
						server can be accessed by anyone with the event code.
					</p>
				</section>

				<section>
					<h4>Editing or Deleting Events</h4>
					<p>
						Access your Dashboard to manage your events. Click &quot;Edit&quot;
						or &quot;Delete&quot; for any event you&apos;ve created. Only the
						event creator can make changes.
					</p>
				</section>
			</article>

			<article>
				<h3>Using Slots</h3>
				<section>
					<h4>Creating Slots</h4>
					<p>
						AI can help estimate the number and type of slots needed based on
						attendee count. Use or customize these suggestions before
						finalizing.
					</p>
				</section>

				<section>
					<h4>Signing Up for Slots</h4>
					<p>
						Participants can sign up for slots directly on the event page and
						leave comments as needed.
					</p>
				</section>
			</article>

			<article>
				<h3>RSVPs</h3>
				<p>
					Participants RSVP by selecting &quot;Attending&quot; or &quot;Not
					Attending&quot; on the event page. They can also leave a note when
					RSVPing.
				</p>
			</article>
		</section>
	);
};

const SyncOptionTabsWrapper = ({
	withSyncContent,
	withoutSyncContent,
}: {
	withSyncContent: JSX.Element;
	withoutSyncContent: JSX.Element;
}) => {
	return (
		<div role="tablist" className="tabs tabs-lifted">
			<input
				type="radio"
				name="guide"
				role="tab"
				className="tab text-nowrap"
				aria-label="With PQ Bot on Discord"
				defaultChecked
			/>
			<div
				role="tabpanel"
				className="tab-content rounded-box border-base-300 bg-base-100 p-6"
			>
				{withSyncContent}
			</div>

			<input
				type="radio"
				name="guide"
				role="tab"
				className="tab text-nowrap"
				aria-label="Web Interface Only"
			/>
			<div
				role="tabpanel"
				className="tab-content rounded-box border-base-300 bg-base-100 p-6"
			>
				{withoutSyncContent}
			</div>
		</div>
	);
};

const GuideContent = () => {
	return (
		<main>
			<h1 className="text-primary-gradient">Guide</h1>

			<p>
				<span className="text-primary-gradient font-bold">
					<PotluckQuest />
				</span>{" "}
				makes potluck planning simple and collaborative, whether you&apos;re
				taking full advantage of our powerful <DiscordLogo /> integration with{" "}
				<span className="text-primary-gradient font-bold">
					<PQBot />
				</span>{" "}
				or prefer the standalone web interface and <OpenAiLogo />
				-assisted tools.
			</p>

			<SyncOptionTabsWrapper
				withSyncContent={<WithBotContent />}
				withoutSyncContent={<WebOnlyContent />}
			/>

			<footer>
				<p>
					<PotluckQuest /> makes event planning flexible and accessible, whether
					you prefer the Discord bot or the standalone web interface. Start your
					potluck today!
				</p>
			</footer>
		</main>
	);
};
const Page = () => {
	// Add a drawer menu that shows what's on this page.
	return (
		<>
			<GuideContent />

			{/*
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <GuideContent />
            <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
            >
                Open drawer
            </label>
        </div >


            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            <li>
                <a>Sidebar Item 1</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
        </ul >
            </div >
            */}
		</>
	);
};

export default Page;
