import Link from "next/link";
import Commands from "~/app/guide/commands";
import Events from "~/app/guide/events";
import GettingStarted from "~/app/guide/getting-started";
import Rsvps from "~/app/guide/rsvps";
import Slots from "~/app/guide/slots";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import OpenAiLogo from "~/components/branding/openai-white-logo";
import { PotluckQuest } from "~/components/branding/potluck-quest-logo";
import { PQBot } from "~/components/branding/pq-bot-logo";

const GuideContent = () => {
	return (
		<main className="w-full rounded-xl bg-base-100/80 p-6 md:p-10 lg:rounded-none lg:rounded-r-xl">
			<h1 className="text-primary-gradient">Guide</h1>

			<p>
				<PotluckQuest /> and its <OpenAiLogo />
				-assisted tools make shared meal planning simple and collaborative,
				whether you&apos;re taking full advantage of our powerful{" "}
				<DiscordLogo /> integration with{" "}
				<span className="text-primary-gradient font-bold">
					<PQBot />
				</span>{" "}
				or prefer the standalone web interface.
			</p>

			<h2 id="getting-started">Getting Started</h2>
			<GettingStarted />

			<h2 id="events">Events</h2>
			<Events />

			<h2 id="slots">Slots</h2>
			<Slots />

			<h2 id="rsvps">RSVPs</h2>
			<Rsvps />

			<h2 id="commands">Commands</h2>
			<Commands />
		</main>
	);
};
const Page = () => {
	return (
		<div className="my-14 w-full rounded-xl border border-base-300 bg-base-100/80 shadow-xl sm:my-24 md:w-11/12 lg:my-28">
			<div className="drawer lg:drawer-open">
				{/* Drawer toggle */}
				<input id="guide-sidebar" type="checkbox" className="drawer-toggle" />

				<div className="drawer-content flex flex-col items-center justify-center">
					{/* Page content */}
					<GuideContent />

					{/* Drawer toggle */}
					<label
						htmlFor="guide-sidebar"
						className="drawer-button hidden"
					></label>
				</div>

				{/* Drawer side */}
				<div className="drawer-side lg:rounded-l-xl lg:bg-base-200">
					{/* Drawer overlay */}
					<label
						htmlFor="guide-sidebar"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>

					{/* Drawer content */}
					<ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
						<li>
							<Link href="#getting-started">Getting Started</Link>
						</li>
						<li>
							<Link href="#events">Events</Link>
							<ul>
								<li>
									<Link href="#creating-an-event">Creating an Event</Link>
								</li>
								<li>
									<Link href="#finding-an-event">Finding an Event</Link>
								</li>
								<li>
									<Link href="#editing-and-deleting-events">
										Editing and Deleting Events
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link href="#slots">Slots</Link>
							<ul>
								<li>
									<Link href="#managing-slots">Managing Slots</Link>
								</li>
								<li>
									<Link href="#signing-up-to-bring-something">
										Signing Up to Bring Something
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link href="#rsvps">RSVPs</Link>
						</li>
						<li>
							<Link href="#commands">Commands</Link>
							<ul>
								<li>
									<Link href="#plan-command">
										<code>/plan</code>
									</Link>
								</li>
								<li>
									<Link href="#view-command">
										<code>/view</code>
									</Link>
								</li>
								<li>
									<Link href="#slots-command">
										<code>/slots</code>
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Page;
