import { z } from "zod";
import { DESCRIPTION_LENGTH } from "~/constants/index.js";

export const description = z.string().trim().max(DESCRIPTION_LENGTH);
