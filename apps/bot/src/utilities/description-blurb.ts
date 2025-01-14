import { DESCRIPTION_LENGTH } from "~/constants/description";

export const buildDescriptionBlurb = (code: string) =>
	`See details at [${code} | Potluck Quest](https://potluck.quest/event/${code})`;

export default buildDescriptionBlurb;

export const removeBlurbTruncateAndGetCode = (description: string | null) => {
	if (!description) {
		return { code: null, description };
	}

	const regex =
		/See details at \[[a-zA-Z0-9]{5} \| Potluck Quest\]\(https:\/\/potluck\.quest\/event\/([a-zA-Z0-9]{5})\)$/m;

	const found = description.match(regex);

	if (!found) {
		return { code: null, description };
	}

	const code = found[1]; // Capturing group from the regex
	const blurb = found[0];
	const blurbIndex = description.lastIndexOf(blurb);

	const cleanedDescription = description.slice(0, blurbIndex).trim();

	const truncatedCleanedDescription =
		cleanedDescription.length > DESCRIPTION_LENGTH
			? cleanedDescription.slice(0, DESCRIPTION_LENGTH - 3).concat("...")
			: cleanedDescription;

	return {
		code,
		description: truncatedCleanedDescription,
	};
};
