import DiscordLogo from "~/components/logos/discord-blurple-logo";
import { PQBot } from "~/components/logos/pq-bot-logo";

const Loading = () => (
	<main className="contrast-container">
		<h1 className="text-primary-gradient">Settings</h1>
		<div className="flex items-center">
			Your&nbsp;<span className="font-bold">preferred timezone</span>
			&nbsp;is&nbsp;
			<div className="skeleton inline-block h-8 w-44" />.
		</div>
		<p>
			<PQBot /> uses this setting on <DiscordLogo />.
		</p>
	</main>
);

export default Loading;
