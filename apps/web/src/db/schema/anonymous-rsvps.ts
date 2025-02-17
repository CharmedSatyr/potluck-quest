import { uuid, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { event } from "~/db/schema/event";

export const anonymousRsvp = pgTable("anonymous_rsvp", {
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	eventId: uuid("event_id")
		.references(() => event.id, { onDelete: "cascade" })
		.notNull(),
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	interestedCount: integer().default(0).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});
