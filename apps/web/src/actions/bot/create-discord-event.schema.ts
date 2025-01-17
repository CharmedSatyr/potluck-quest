import { discordGuildId } from "@potluck/validation";
import { z } from "zod";
import { schema as createEventSchema } from "~/actions/event/create-event.schema";

export const schema = createEventSchema.extend({
	guildId: discordGuildId,
}) satisfies z.ZodType<EventUserValues & { guildId: string }>;
