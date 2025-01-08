import { user } from "~/db/schema/auth/user";

declare global {
	type User = typeof user.$inferSelect;
}
