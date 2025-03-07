import Link from "next/link";
import Commands from "~/app/guide/commands";
import Events from "~/app/guide/events";
import GettingStarted from "~/app/guide/getting-started";
import Introduction from "~/app/guide/introduction";
import Rsvps from "~/app/guide/rsvps";
import Slots from "~/app/guide/slots";

const GuideContent = () => {
	return (
		<main className="bg-base-100/80 border-base-300 w-full rounded-xl border p-6 md:p-10 lg:rounded-none lg:rounded-r-xl">
			<h1 className="text-primary-gradient">Guide</h1>
			<h2 className="mt-0" id="introduction">
				A Right Proper Introduction
			</h2>
			<Introduction />

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
		<div className="my-14 w-full rounded-xl sm:my-24 md:w-11/12 lg:my-28">
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
				<div className="drawer-side lg:bg-base-200 lg:rounded-l-xl">
					{/* Drawer overlay */}
					<label
						htmlFor="guide-sidebar"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>

					{/* Drawer content */}
					<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
						<li>
							<Link href="#introduction" className="no-underline">
								A Right Proper Introduction
							</Link>
						</li>

						<li>
							<Link href="#getting-started" className="no-underline">
								Getting Started
							</Link>
						</li>
						<li>
							<Link href="#events" className="no-underline">
								Events
							</Link>
							<ul>
								<li>
									<Link href="#creating-an-event" className="no-underline">
										Creating an Event
									</Link>
								</li>
								<li>
									<Link href="#finding-an-event" className="no-underline">
										Finding an Event
									</Link>
								</li>
								<li>
									<Link
										href="#editing-and-deleting-events"
										className="no-underline"
									>
										Editing and Deleting Events
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link href="#slots" className="no-underline">
								Slots
							</Link>
							<ul>
								<li>
									<Link href="#managing-slots" className="no-underline">
										Managing Slots
									</Link>
								</li>
								<li>
									<Link
										href="#signing-up-to-bring-something"
										className="no-underline"
									>
										Signing Up to Bring Something
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link href="#rsvps" className="no-underline">
								RSVPs
							</Link>
						</li>
						<li>
							<Link href="#commands" className="no-underline">
								Commands
							</Link>
							<ul>
								<li>
									<Link href="#plan-command" className="no-underline">
										<code className="not-prose">/plan</code>
									</Link>
								</li>
								<li>
									<Link href="#view-command" className="no-underline">
										<code className="not-prose">/view</code>
									</Link>
								</li>
								<li>
									<Link href="#slots-command" className="no-underline">
										<code className="not-prose">/slots</code>
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
