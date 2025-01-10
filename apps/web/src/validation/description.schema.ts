import { z } from "zod";
import { DESCRIPTION_LENGTH } from "~/constants/description-length";

export const description = z.string().trim().max(DESCRIPTION_LENGTH);
