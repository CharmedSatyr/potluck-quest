import Link from "next/link";
import { BOT_INSTALL_LINK } from "~/constants/bot-install-link";

export const PQBot = () => (
	<Link
		className="no-underline"
		href={BOT_INSTALL_LINK}
		target="_blank"
		rel="noopener noreferrer"
	>
		<span className="text-secondary">PQ Bot</span>
	</Link>
);

export const PotluckQuest = () => (
	<Link className="no-underline" href="/">
		<span className="text-primary-gradient">Potluck Quest</span>
	</Link>
);
export const Command = ({
	command,
}: {
	command: "plan" | "view" | "slots";
}) => (
	<Link href="#">
		<code>/{command}</code>
	</Link>
);
export const SignupSlots = () => <Link href="#">signup slots</Link>;
