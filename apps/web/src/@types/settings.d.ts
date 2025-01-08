import { settings } from "~/db/schema/settings";

declare global {
	type Settings = typeof settings.$inferSelect;
}
