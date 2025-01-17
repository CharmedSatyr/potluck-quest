import { z } from "@potluck/shared/validation";
import config from "~/constants/env-config.js";
import { DEFAULT_TIMEZONE } from "~/constants/timezone.js";
import api from "~/constants/web-api.js";
import {
	createPotluckEventSchema,
	mapDiscordToPotluckEventSchema,
} from "~/services/potluck-quest.schema.js";
import { slotsCache } from "~/utilities/cache.js";

const headers = new Headers({ "x-api-key": config.PQ_BOT_TO_WEB_API_KEY });

export const createPotluckEvent = async (
	data: z.infer<typeof createPotluckEventSchema>
): Promise<string | null> => {
	try {
		createPotluckEventSchema.parse(data);

		const result = await fetch(api.EVENT, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		if (!result.ok) {
			const json = await result.json();
			console.warn("Failed to create event:", result.status, json.errors);
			return null;
		}

		const { code } = await result.json();

		if (!code) {
			return null;
		}

		return code;
	} catch (error) {
		console.error("Error creating Potluck Quest event:", error);

		return null;
	}
};

export const mapDiscordToPotluckEvent = async (
	data: z.infer<typeof mapDiscordToPotluckEventSchema>
): Promise<boolean> => {
	try {
		mapDiscordToPotluckEventSchema.parse(data);

		const result = await fetch(api.MAPPING, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return result.ok;
	} catch (error) {
		console.error("Error mapping Discord event to Potluck Quest event:", error);

		return false;
	}
};

export type UpdateEventData = {
	code: string;
	description?: string;
	endUtcMs?: number;
	location?: string;
	startUtcMs?: number;
	title?: string;
};

export const updateEvent = async (data: UpdateEventData): Promise<boolean> => {
	try {
		const result = await fetch(api.EVENT, {
			headers,
			method: "PUT",
			body: JSON.stringify(data),
		});

		if (!result.ok) {
			console.warn("Failed to update Potluck Quest event:", result.status);
		}

		return result.ok;
	} catch (error) {
		console.error("Error updating Potluck Quest event:", error);

		return false;
	}
};

export type DeleteEventData = {
	code: string;
};

export const deleteEvent = async (data: DeleteEventData): Promise<boolean> => {
	try {
		const result = await fetch(api.EVENT, {
			headers,
			method: "DELETE",
			body: JSON.stringify(data),
		});

		if (!result.ok) {
			console.warn("Failed to delete Potluck Quest event:", result.status);
		}

		return result.ok;
	} catch (error) {
		console.error("Error deleting Potluck Quest event:", error);

		return false;
	}
};

export const getSlots = async (code: string): Promise<Slot[] | null> => {
	try {
		code = code.toUpperCase();

		const params = new URLSearchParams({ code });

		const result = await fetch(api.SLOTS + "?" + params.toString(), {
			headers,
		});

		if (!result.ok) {
			return null;
		}

		const { slots }: { slots: Slot[] } = await result.json();

		slots.forEach((slot) => slotsCache.set(slot.id, { code, slot }));

		return slots;
	} catch (err) {
		console.error(`Error getting Potluck Quest slots for code ${code}:`, err);

		return null;
	}
};

type SlotData = {
	discordUserId: string;
	description: string;
	quantity: number;
	slotId: string;
};

export const createCommitment = async (data: SlotData) => {
	try {
		const result = await fetch(api.COMMITMENT, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return result.ok;
	} catch (err) {
		console.error("Error creating commitment", JSON.stringify(err, null, 2));

		return false;
	}
};

export const checkAccountExists = async (
	discordUserId: string
): Promise<boolean> => {
	try {
		const params = new URLSearchParams({ providerAccountId: discordUserId });

		const result = await fetch(api.USER + "?" + params.toString(), { headers });

		if (!result.ok) {
			console.error("Failed account exists check", result.status);
			return false;
		}

		const data: { exists: boolean } = await result.json();

		return data.exists;
	} catch (err) {
		console.error(
			"Error checking account exists:",
			JSON.stringify(err, null, 2)
		);

		return false;
	}
};

type RsvpData = {
	code: string;
	discordUserId: string;
	message: string;
	response: "yes" | "no";
};

export const upsertRsvp = async (data: RsvpData) => {
	try {
		const result = await fetch(api.RSVP, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return result.ok;
	} catch (err) {
		console.error("Failed to upsert RSVP:", err, JSON.stringify(err, null, 2));

		return false;
	}
};

export const getUserTimezone = async (
	discordUserId: string
): Promise<SupportedTimezone> => {
	try {
		const params = new URLSearchParams({ discordUserId });

		const result = await fetch(api.TIMEZONE + "?" + params.toString(), {
			headers,
		});

		if (!result.ok) {
			console.warn("Failed to get user timezone:", result.status);
			return DEFAULT_TIMEZONE;
		}

		const data: { timezone: SupportedTimezone } = await result.json();

		return data.timezone;
	} catch (err) {
		console.error("Error getting user timezone:", err);

		return DEFAULT_TIMEZONE;
	}
};
