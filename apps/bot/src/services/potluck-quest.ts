import { DEFAULT_TIMEZONE } from "@potluck/utilities/constants";
import type { SupportedTimezone } from "@potluck/utilities/types";
import { webApiBot, z } from "@potluck/utilities/validation";
import config from "~/constants/env-config.js";
import api from "~/constants/web-api.js";
import { slotsCache } from "~/utilities/cache.js";

const headers = new Headers({ "x-api-key": config.PQ_BOT_TO_WEB_API_KEY });

export const createPotluckEvent = async (
	data: z.infer<typeof webApiBot.event.postSchema>
): Promise<string | null> => {
	try {
		webApiBot.event.postSchema.parse(data);

		const response = await fetch(api.EVENT, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const json = await response.json();
			console.warn("Failed to create event:", response.status, json.errors);
			return null;
		}

		const result = await response.json();

		if (!result?.code) {
			return null;
		}

		return result.code;
	} catch (error) {
		console.error("Error creating Potluck Quest event:", error);

		return null;
	}
};

export const mapDiscordToPotluckEvent = async (
	data: z.infer<typeof webApiBot.mapping.postSchema>
): Promise<boolean> => {
	try {
		webApiBot.mapping.postSchema.parse(data);

		const response = await fetch(api.MAPPING, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return response.ok;
	} catch (error) {
		console.error("Error mapping Discord event to Potluck Quest event:", error);

		return false;
	}
};

export const updatePotluckEvent = async (
	data: z.infer<typeof webApiBot.event.putSchema>
): Promise<boolean> => {
	try {
		webApiBot.event.putSchema.parse(data);

		const response = await fetch(api.EVENT, {
			headers,
			method: "PUT",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			console.warn("Failed to update Potluck Quest event:", response.status);
		}

		return response.ok;
	} catch (error) {
		console.error("Error updating Potluck Quest event:", error);

		return false;
	}
};

export const deletePotluckEvent = async (
	data: z.infer<typeof webApiBot.event.deleteSchema>
): Promise<boolean> => {
	try {
		webApiBot.event.deleteSchema.parse(data);

		const response = await fetch(api.EVENT, {
			headers,
			method: "DELETE",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			console.warn("Failed to delete Potluck Quest event:", response.status);
		}

		return response.ok;
	} catch (error) {
		console.error("Error deleting Potluck Quest event:", error);

		return false;
	}
};

export const getSlots = async (
	data: z.infer<typeof webApiBot.slots.getSchema>
): Promise<Slot[] | null> => {
	try {
		webApiBot.slots.getSchema.parse(data);

		const params = new URLSearchParams(data);

		const response = await fetch(api.SLOTS + "?" + params.toString(), {
			headers,
		});

		if (!response.ok) {
			return null;
		}

		const result: { slots: Slot[] } = await response.json();

		result.slots.forEach((slot) =>
			slotsCache.set(slot.id, { code: data.code, slot })
		);

		return result.slots;
	} catch (err) {
		console.error(
			`Error getting Potluck Quest slots for code ${data.code}:`,
			err
		);

		return null;
	}
};

export const createCommitment = async (
	data: z.infer<typeof webApiBot.commitment.postSchema>
) => {
	try {
		webApiBot.commitment.postSchema.parse(data);

		const response = await fetch(api.COMMITMENT, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return response.ok;
	} catch (err) {
		console.error("Error creating commitment", JSON.stringify(err, null, 2));

		return false;
	}
};

export const checkAccountExists = async (
	data: z.infer<typeof webApiBot.user.getSchema>
): Promise<boolean> => {
	try {
		webApiBot.user.getSchema.parse(data);

		const params = new URLSearchParams({
			providerAccountId: data.providerAccountId,
		});

		const response = await fetch(api.USER + "?" + params.toString(), {
			headers,
		});

		if (!response.ok) {
			console.error("Failed account exists check", response.status);
			return false;
		}

		const result: { exists: boolean } = await response.json();

		return result.exists;
	} catch (err) {
		console.error(
			"Error checking account exists:",
			JSON.stringify(err, null, 2)
		);

		return false;
	}
};

export const upsertRsvp = async (
	data: z.infer<typeof webApiBot.rsvp.postSchema>
) => {
	try {
		webApiBot.rsvp.postSchema.parse(data);

		const response = await fetch(api.RSVP, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return response.ok;
	} catch (err) {
		console.error("Failed to upsert RSVP:", err, JSON.stringify(err, null, 2));

		return false;
	}
};

export const getUserTimezone = async (
	data: z.infer<typeof webApiBot.timezone.getSchema>
): Promise<SupportedTimezone> => {
	try {
		webApiBot.timezone.getSchema.parse(data);

		const params = new URLSearchParams(data);

		const response = await fetch(api.TIMEZONE + "?" + params.toString(), {
			headers,
		});

		if (!response.ok) {
			console.warn("Failed to get user timezone:", response.status);
			return DEFAULT_TIMEZONE;
		}

		const result: { timezone: SupportedTimezone } = await response.json();

		return result.timezone;
	} catch (err) {
		console.error("Error getting user timezone:", err);

		return DEFAULT_TIMEZONE;
	}
};
