"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/user/find-provider-account-id-by-user-id.schema";
import db from "~/db/connection";
import { account } from "~/db/schema/auth/account";

const findProviderAccountIdByUserId = async (
	data: z.infer<typeof schema>
): Promise<{ providerAccountId: Account["providerAccountId"] }[]> => {
	try {
		schema.parse(data);

		return await db
			.select({ providerAccountId: account.providerAccountId })
			.from(account)
			.where(eq(account.userId, data.userId));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findProviderAccountIdByUserId;
