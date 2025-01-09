"use server";

import upsertTimezone from "~/actions/settings/upsert-timezone";
import { auth } from "~/auth";

const setDefaultTimezoneAction = async (timezone: SupportedTimezone) => {
	const session = await auth();

	if (!session?.user?.id) {
		return;
	}

	await upsertTimezone({ timezone, userId: session.user.id });
};

export default setDefaultTimezoneAction;
