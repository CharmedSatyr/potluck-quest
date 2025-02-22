import { z } from "zod";
import { COMMITMENT_DESCRIPTION_LENGTH } from "~/constants/index.js";

export const commitmentDescription = z
	.string()
	.trim()
	.max(COMMITMENT_DESCRIPTION_LENGTH);
