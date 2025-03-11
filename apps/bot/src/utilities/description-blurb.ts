import { EVENT_DESCRIPTION_LENGTH } from "@potluck/utilities/constants";
import envConfig from "~/constants/env-config.js";

export const addDescriptionBlurb = (
	description: string | null,
	code: string
) => {
	const blurb = `See details at [${code} | Potluck Quest](${envConfig.PQ_WEB_BASE_URL}/event/${code}).`;

	if (!description) {
		return blurb;
	}

	const descriptionWithBlurb = description.concat("\n\n").concat(blurb);

	if (descriptionWithBlurb.length > EVENT_DESCRIPTION_LENGTH) {
		return description;
	}

	return descriptionWithBlurb;
};

export const removeDescriptionBlurb = (
	description: string | null
): { description: string } => {
	if (!description) {
		return { description: "" };
	}

	const regex =
		/See details at \[[a-zA-Z0-9]{5} \| Potluck Quest\]\((https?:\/\/[^)]+)\/event\/([a-zA-Z0-9]{5})\)\.$/gm;

	const found = description.match(regex);

	if (!found) {
		return { description };
	}

	// Capturing groups from the regex
	const blurb = found[0];
	// code is found[1]

	const blurbIndex = description.lastIndexOf(blurb);

	const cleanedDescription = description.slice(0, blurbIndex).trim();

	return {
		description: cleanedDescription,
	};
};
