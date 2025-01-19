import { z } from "zod";
import { EVENT_CODE_LENGTH } from "~/constants/index.js";

export const code = z
	.string()
	.trim()
	.length(EVENT_CODE_LENGTH)
	.toUpperCase()
	.readonly();
