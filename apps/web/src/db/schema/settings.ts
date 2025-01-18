import { SUPPORTED_TIMEZONES } from "@potluck/shared/constants";
import { timestamp, pgTable, uuid, pgEnum } from "drizzle-orm/pg-core";
import { user } from "~/db/schema/auth/user";

export const timezoneEnum = pgEnum("timezone", SUPPORTED_TIMEZONES); // Must export to generate enum type

export const settings = pgTable("settings", {
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	timezone: timezoneEnum().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	userId: uuid("user_id")
		.references(() => user.id, { onDelete: "cascade" })
		.unique()
		.notNull(),
});
