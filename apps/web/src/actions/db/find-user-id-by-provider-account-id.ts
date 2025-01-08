"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/db/find-user-id-by-provider-account-id.schema";
import db from "~/db/connection";
import { account } from "~/db/schema/auth/account";

const findUserIdByProviderAccountId = async (
	data: z.infer<typeof schema>
): Promise<{ id: User["id"] }[]> => {
	try {
		return await db
			.select({ id: account.userId })
			.from(account)
			.where(eq(account.providerAccountId, data.providerAccountId));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findUserIdByProviderAccountId;
