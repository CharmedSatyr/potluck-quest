import { rsvp } from "~/db/schema/rsvp";

declare global {
	type Rsvp = typeof rsvp.$inferSelect;
}
