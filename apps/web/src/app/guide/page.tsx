import GettingStarted from "./getting-started";
import { PotluckQuest, PQBot } from "./links";
import ManagingEvents from "./managing-events";
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

			<h2>Getting Started</h2>
			<GettingStarted />

			<h2>Managing Events</h2>
			<ManagingEvents />
		</main>
	);
};
const Page = () => {
	return (
		<div className="drawer lg:drawer-open lg:absolute lg:w-10/12">
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
						<a>Using Potluck Quest with PQ Bot on Discord</a>
					</li>
					<li>
						<a>Web Interface</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Page;
