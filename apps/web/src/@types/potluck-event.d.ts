import { event } from "~/db/schema/event";

declare global {
	type PotluckEvent = typeof event.$inferSelect;

	type EventInput = Pick<
		PotluckEvent,
		"description" | "hosts" | "location" | "title"
	> & { startDate: string; startTime: string; timezone: string };

	type EventData = Pick<
		PotluckEvent,
		"description" | "endUtcMs" | "hosts" | "location" | "startUtcMs" | "title"
	>;

	type EventDataWithCtx = Pick<PotluckEvent, "createdBy" | "id"> & EventData;

	type EventUserValues = Pick<
		PotluckEvent,
		| "createdBy"
		| "description"
		| "endUtcMs"
		| "hosts"
		| "location"
		| "startUtcMs"
		| "title"
	>;
}
