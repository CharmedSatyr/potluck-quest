import { code, discordInterestedCount } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
	discordInterestedCount,
}) satisfies z.ZodType<{
	code: PotluckEvent["code"];
	discordInterestedCount: AnonymousRsvps["discordInterestedCount"];
}>;
