import { code, interestedCount } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
	interestedCount,
}) satisfies z.ZodType<{
	code: PotluckEvent["code"];
	interestedCount: AnonymousRsvp["interestedCount"];
}>;
