import { z } from "zod";

export const suggestions = z.strictObject({
	advice: z.string().trim().max(300).describe(`
			A helpful, unformatted message indicating an approach to meal planning
			for this event given the particular event details, and themed for Potluck Quest.
		`),
	slots: z
		.array(
			z.strictObject({
				count: z.number().max(999),
				item: z.string().trim().max(500),
				order: z.number().min(1),
			})
		)
		.describe(
			"An ordered list of types and counts of items the host should request from attendees."
		),
});
