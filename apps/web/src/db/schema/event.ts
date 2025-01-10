import {
	index,
	pgTable,
	timestamp,
	uuid,
	varchar,
	bigint,
} from "drizzle-orm/pg-core";
import { DESCRIPTION_LENGTH } from "~/constants/description-length";
import { EVENT_CODE_LENGTH } from "~/constants/event-code-length";
import { user } from "~/db/schema/auth/user";

const createCode = (): string =>
	Math.random()
		.toString(36)
		.substring(2, 2 + EVENT_CODE_LENGTH)
		.toUpperCase();

export const event = pgTable(
	"event",
	{
		// TODO: Capacity
		// TODO: Cost per person
		// TODO: Cover image ()
		code: varchar("code", { length: EVENT_CODE_LENGTH })
			.notNull()
			.unique()
			.$default(createCode),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		createdBy: uuid("user_id")
			.references(() => user.id, { onDelete: "cascade" })
			.notNull(),
		description: varchar("description", {
			length: DESCRIPTION_LENGTH,
		}).notNull(),
		endUtcMs: bigint("end_utc_ms", { mode: "number" }).notNull(),
		hosts: varchar("hosts", { length: 100 }).notNull(),
		id: uuid("id").primaryKey().notNull().defaultRandom(),
		location: varchar("location", { length: 100 }).notNull(),
		startUtcMs: bigint("start_utc_ms", { mode: "number" }).notNull(),
		title: varchar("title", { length: 100 }).notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [index("code_idx").on(table.code)]
);
