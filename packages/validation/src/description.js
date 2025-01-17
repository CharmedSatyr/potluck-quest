import { DESCRIPTION_LENGTH } from "@potluck/constants";
import { z } from "zod";

export const description = z.string().trim().max(DESCRIPTION_LENGTH);
