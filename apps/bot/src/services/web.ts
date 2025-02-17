import { DEFAULT_TIMEZONE } from "@potluck/utilities/constants";
import type { SupportedTimezone } from "@potluck/utilities/types";
import {
	code,
	discordEventId,
	webApiBot,
	z,
} from "@potluck/utilities/validation";
import config from "~/constants/env-config.js";
import webApi from "~/constants/web-api.js";
import {
	accountExistsCache,
	slotsCache,
	timezoneCache,
} from "~/utilities/cache.js";

const headers = new Headers({ "x-api-key": config.PQ_BOT_TO_WEB_API_KEY });

export const createPotluckQuestEvent = async (
	data: z.infer<typeof webApiBot.event.postSchema>
): Promise<string | null> => {
	const timingStart = performance.now();

	try {
		webApiBot.event.postSchema.parse(data);

		const response = await fetch(webApi.EVENT, {
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
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "createPotluckQuestEvent timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const mapDiscordToPotluckEvent = async (
	data: z.infer<typeof webApiBot.mapping.postSchema>
): Promise<boolean> => {
	const timingStart = performance.now();

	try {
		webApiBot.mapping.postSchema.parse(data);

		const response = await fetch(webApi.MAPPING, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return response.ok;
	} catch (error) {
		console.error("Error mapping Discord event to Potluck Quest event:", error);

		return false;
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "mapDiscordToPotluckEvent timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const getPotluckCodesByDiscordIds = async (
	data: z.infer<typeof webApiBot.mapping.getSchema>
): Promise<Record<z.infer<typeof discordEventId>, z.infer<typeof code>>> => {
	const timingStart = performance.now();

	try {
		webApiBot.mapping.getSchema.parse(data);

		const params = new URLSearchParams({
			discordEventIds: data.discordEventIds.join(","),
		});

		const response = await fetch(webApi.MAPPING + "?" + params.toString(), {
			headers,
		});

		if (!response.ok) {
			console.warn({
				message: "Failed to get Potluck Quest codes from Discord event IDs:",
				status: response.status,
				response: await response.json(),
			});

			return {};
		}

		return await response.json();
	} catch (error) {
		console.error(
			"Error getting Potluck Quest codes from Discord event IDs",
			error
		);

		return {};
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "getPotluckCodesByDiscordIds timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const updatePotluckEvent = async (
	data: z.infer<typeof webApiBot.event.putSchema>
): Promise<boolean> => {
	const timingStart = performance.now();

	try {
		webApiBot.event.putSchema.parse(data);

		const response = await fetch(webApi.EVENT, {
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
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "updatePotluckEvent timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const deletePotluckEvent = async (
	data: z.infer<typeof webApiBot.event.deleteSchema>
): Promise<boolean> => {
	const timingStart = performance.now();

	try {
		webApiBot.event.deleteSchema.parse(data);

		const response = await fetch(webApi.EVENT, {
			headers,
			method: "DELETE",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const json = await response.json();
			console.warn({
				message: "Failed to delete Potluck Quest event",
				json,
				status: response.status,
			});
		}

		return response.ok;
	} catch (error) {
		console.error("Error deleting Potluck Quest event:", error);

		return false;
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "deletePotluckEvent timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const getSlots = async (
	data: z.infer<typeof webApiBot.slots.getSchema>
): Promise<Slot[] | null> => {
	const timingStart = performance.now();

	try {
		webApiBot.slots.getSchema.parse(data);

		const params = new URLSearchParams(data);

		const response = await fetch(webApi.SLOTS + "?" + params.toString(), {
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
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "getSlots timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const createCommitment = async (
	data: z.infer<typeof webApiBot.commitment.postSchema>
) => {
	const timingStart = performance.now();

	try {
		webApiBot.commitment.postSchema.parse(data);

		const response = await fetch(webApi.COMMITMENT, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return response.ok;
	} catch (err) {
		console.error("Error creating commitment", JSON.stringify(err, null, 2));

		return false;
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "createCommitment timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const checkAccountExists = async (
	data: z.infer<typeof webApiBot.user.getSchema>
): Promise<boolean> => {
	const timingStart = performance.now();

	try {
		webApiBot.user.getSchema.parse(data);

		const accountExists = accountExistsCache.get(data.providerAccountId);

		if (accountExists) {
			return true;
		}

		const params = new URLSearchParams({
			providerAccountId: data.providerAccountId,
		});

		const response = await fetch(webApi.USER + "?" + params.toString(), {
			headers,
		});

		if (!response.ok) {
			console.error("Failed account exists check", response.status);
			return false;
		}

		const result: { exists: boolean } = await response.json();

		accountExistsCache.set(data.providerAccountId, result.exists);

		return result.exists;
	} catch (err) {
		console.error({
			message: "Error checking account exists",
			error: err,
		});

		return false;
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "checkAccountExists timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const upsertRsvp = async (
	data: z.infer<typeof webApiBot.rsvp.postSchema>
) => {
	const timingStart = performance.now();

	try {
		webApiBot.rsvp.postSchema.parse(data);

		const response = await fetch(webApi.RSVP, {
			headers,
			method: "POST",
			body: JSON.stringify(data),
		});

		return response.ok;
	} catch (err) {
		console.error("Failed to upsert RSVP:", err, JSON.stringify(err, null, 2));

		return false;
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "upsertRsvp timing",
			ms: timingEnd - timingStart,
		});
	}
};

export const getUserTimezone = async (
	data: z.infer<typeof webApiBot.timezone.getSchema>
): Promise<SupportedTimezone> => {
	const timingStart = performance.now();

	try {
		webApiBot.timezone.getSchema.parse(data);

		const timezone = timezoneCache.get(data.discordUserId);

		if (timezone) {
			return timezone;
		}

		const params = new URLSearchParams(data);

		const response = await fetch(webApi.TIMEZONE + "?" + params.toString(), {
			headers,
		});

		if (!response.ok) {
			console.warn("Failed to get user timezone:", response.status);
			return DEFAULT_TIMEZONE;
		}

		const result: { timezone: SupportedTimezone } = await response.json();

		timezoneCache.set(data.discordUserId, result.timezone);

		return result.timezone;
	} catch (err) {
		console.error("Error getting user timezone:", err);

		return DEFAULT_TIMEZONE;
	} finally {
		const timingEnd = performance.now();
		console.info({
			message: "getUserTimezone timing",
			ms: timingEnd - timingStart,
		});
	}
};
