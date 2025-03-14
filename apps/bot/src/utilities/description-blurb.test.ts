import { EVENT_DESCRIPTION_LENGTH } from "@potluck/utilities/constants";
import envConfig from "~/constants/env-config.js";
import {
	addDescriptionBlurb,
	removeDescriptionBlurb,
} from "~/utilities/description-blurb.js";

describe("addDescriptionBlurb", () => {
	const code = "ABCDE";
	const blurb = `See details at [${code} | Potluck Quest](${envConfig.PQ_WEB_BASE_URL}/event/${code}).`;

	it("should return only the blurb if description is null", () => {
		expect(addDescriptionBlurb(null, code)).toBe(blurb);
	});

	it("should append the blurb when description is provided", () => {
		const description = "This is an event.";
		expect(addDescriptionBlurb(description, code)).toBe(
			`${description}\n\n${blurb}`
		);
	});

	it("should not append the blurb if it exceeds EVENT_DESCRIPTION_LENGTH", () => {
		const longDescription = "a".repeat(
			EVENT_DESCRIPTION_LENGTH - blurb.length + 1
		);
		expect(addDescriptionBlurb(longDescription, code)).toBe(longDescription);
	});
});

describe("removeDescriptionBlurb", () => {
	const code = "ABCDE";
	const blurb = `See details at [${code} | Potluck Quest](${envConfig.PQ_WEB_BASE_URL}/event/${code}).`;

	it("should return empty string when description is null", () => {
		expect(removeDescriptionBlurb(null)).toEqual({ description: "" });
	});

	it("should remove the blurb if present", () => {
		const description = "This is an event.";
		const descriptionWithBlurb = `${description}\n\n${blurb}`;
		expect(removeDescriptionBlurb(descriptionWithBlurb)).toEqual({
			description,
		});
	});

	it("should return the original description if no blurb is found", () => {
		const description = "This is an event without a blurb.";
		expect(removeDescriptionBlurb(description)).toEqual({ description });
	});
});
