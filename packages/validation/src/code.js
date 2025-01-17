import { EVENT_CODE_LENGTH } from "@potluck/constants";
import { z } from "zod";

export const code = z.string().trim().length(EVENT_CODE_LENGTH).readonly();
