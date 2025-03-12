import ExternalLink from "~/components/external-link";
import { BOT_INSTALL_LINK } from "~/constants/bot-install-link";

export const PQBot = () => (
	<ExternalLink className="no-underline" href={BOT_INSTALL_LINK}>
		<span className="text-secondary">PQ Bot</span>
	</ExternalLink>
);
