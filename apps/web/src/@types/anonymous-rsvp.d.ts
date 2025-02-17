import { anonymousRsvps } from "~/db/schema/anonymous-rsvps";

declare global {
	type AnonymousRsvps = typeof anonymousRsvps.$inferSelect;
}
