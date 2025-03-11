import { z } from "zod";
import { EVENT_DESCRIPTION_LENGTH } from "~/constants/index.js";

export const description = z.string().trim().max(EVENT_DESCRIPTION_LENGTH);
