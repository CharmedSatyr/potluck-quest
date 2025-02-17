import { anonymousRsvp } from "~/db/schema/anonymous-rsvps";

declare global {
	type AnonymousRsvp = typeof anonymousRsvp.$inferSelect;
}
