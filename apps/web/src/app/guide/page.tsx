import Commands from "./commands";
import Events from "./events";
import GettingStarted from "./getting-started";
import { PotluckQuest, PQBot } from "./links";
import Rsvps from "./rsvps";
import Slots from "./slots";
import Link from "next/link";
import DiscordLogo from "~/components/discord-blurple-logo";
import OpenAiLogo from "~/components/openai-white-logo";

const GuideContent = () => {
	return (
		<main className="border border-base-300 bg-base-100 lg:rounded-r-xl lg:p-8">
			<h1 className="text-primary-gradient">Guide</h1>

			<p>
				<span className="text-primary-gradient font-bold">
					<PotluckQuest />
				</span>{" "}
				and its <OpenAiLogo />
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
		<div className="lg:absolute lg:top-24 lg:w-10/12">
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
				</div>

				<div className="drawer-side bg-base-200 lg:rounded-l-xl">
					<label
						htmlFor="my-drawer-2"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>

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
									<Link href="#managing-slots">Managing Slots (Hosts)</Link>
								</li>
								<li>
									<Link href="#signing-up-to-bring-something">
										Signing Up to Bring Something (Guests)
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
									<Link href="#plan">
										<code>/plan</code>
									</Link>
								</li>
								<li>
									<Link href="#view">
										<code>/view</code>
									</Link>
								</li>
								<li>
									<Link href="#slots">
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
