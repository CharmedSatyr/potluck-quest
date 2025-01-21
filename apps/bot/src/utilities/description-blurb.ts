import { DESCRIPTION_LENGTH } from "@potluck/utilities/constants";

export const addDescriptionBlurb = (
	description: string | null,
	code: string
) => {
	const blurb = `See details at [${code} | Potluck Quest](https://potluck.quest/event/${code})`;

	if (!description) {
		return blurb;
	}

	if (blurb.length + description.length > DESCRIPTION_LENGTH) {
		return description;
	}

	return description.concat("\n").concat(blurb);
};

export const removeDescriptionBlurb = (
	description: string | null
): { description: string } => {
	if (!description) {
		return { description: "" };
	}

	const regex =
		/See details at \[[a-zA-Z0-9]{5} \| Potluck Quest\]\(https:\/\/potluck\.quest\/event\/([a-zA-Z0-9]{5})\)$/m;

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
