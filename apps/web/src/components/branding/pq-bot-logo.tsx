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
