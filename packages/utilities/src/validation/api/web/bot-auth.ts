import { z } from "zod";
import { code } from "~/validation/code.js";

export const getPlanFoodSchema = z.strictObject({
	code,
	source: z.literal("discord"),
});

export const getSetupSchema = z.strictObject({});
