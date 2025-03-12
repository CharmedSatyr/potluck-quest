import { buildDiscordEventLink } from "@potluck/utilities/helpers";
import { type DiscordEventMetadata } from "~/actions/bot/event/fetch-discord-event-metadata";
import ExternalLink from "~/components/external-link";
import GuildIcon from "~/components/guild-icon";

const GuildLink = ({
	discordMetadata,
}: {
	discordMetadata: DiscordEventMetadata;
}) => (
	<ExternalLink
		href={buildDiscordEventLink(
			discordMetadata.discordGuildId,
			discordMetadata.discordEventId
		)}
	>
		<GuildIcon name={discordMetadata.name} url={discordMetadata.iconUrl} />{" "}
		{discordMetadata.name}
	</ExternalLink>
);

export default GuildLink;
