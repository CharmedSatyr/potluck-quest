import { integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { user } from "~/db/schema/auth/user";

export const account = pgTable(
	"account",
	{
		userId: uuid("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => [
		primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	]
);
