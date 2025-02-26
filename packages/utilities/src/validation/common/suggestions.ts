import { z } from "zod";
import { SLOT_COUNT_MAX, SLOT_ITEM_LENGTH } from "~/constants/index.js";

export const suggestions = z.strictObject({
	advice: z.string().trim().max(300).describe(`
			A helpful, unformatted message indicating an approach to meal planning
			for this event given the particular event details, and themed for Potluck Quest.
		`),
	slots: z
		.array(
			z.strictObject({
				count: z.number().max(SLOT_COUNT_MAX),
				item: z.string().trim().max(SLOT_ITEM_LENGTH),
				order: z.number().min(1),
			})
		)
		.describe(
			"An ordered list of types and counts of items the host should request from attendees."
		),
});
