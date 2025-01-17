import { z } from "zod";
import { schema as createEventSchema } from "~/actions/event/create-event.schema";
import { discordGuildId } from "~/validation/discord-guild-id-schema";

export const schema = createEventSchema.extend({
	guildId: discordGuildId,
}) satisfies z.ZodType<EventUserValues & { guildId: string }>;
