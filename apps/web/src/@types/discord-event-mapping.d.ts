import { discordEventMapping } from "~/db/schema/discord-event-mapping";

declare global {
	type DiscordEventMapping = typeof discordEventMapping.$inferSelect;
}
