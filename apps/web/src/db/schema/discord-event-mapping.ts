import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { EVENT_CODE_LENGTH } from "~/constants/event-code-length";
import { event } from "~/db/schema/event";

export const discordEventMapping = pgTable("discord_event_mapping", {
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	discordEventId: varchar("discord_event_id", { length: 25 })
		.notNull()
		.unique(),
	discordGuildId: varchar("discord_guild_id", { length: 25 }).notNull(),
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	potluckEventCode: varchar("potluck_event_code", { length: EVENT_CODE_LENGTH })
		.references(() => event.code, {
			onDelete: "cascade",
		})
		.notNull()
		.unique(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});
