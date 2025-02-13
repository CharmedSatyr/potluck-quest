import DiscordLogo from "~/components/branding/discord-blurple-logo";
import { PQBot } from "~/components/branding/pq-bot-logo";

const Loading = () => (
	<main className="contrast-container">
		<h1 className="text-primary-gradient">Settings</h1>
		<div className="flex flex-wrap items-center">
			Your&nbsp;<span className="font-bold">preferred timezone</span>
			&nbsp;is&nbsp;
			<div className="skeleton inline-block h-8 w-11/12 sm:w-44" />.
		</div>
		<p>
			<PQBot /> uses this setting on <DiscordLogo />.
		</p>
	</main>
);

export default Loading;
