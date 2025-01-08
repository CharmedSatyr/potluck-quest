import { account } from "~/db/schema/auth/account";

declare global {
	type Account = typeof account.$inferSelect;
}
