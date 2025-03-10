"use server";

import type { SupportedTimezone } from "@potluck/utilities/types";
import { timezone } from "@potluck/utilities/validation";
import { revalidatePath } from "next/cache";
import upsertTimezone from "~/actions/settings/upsert-timezone";
import { auth } from "~/auth";

export const updateTimezoneAction = async (
	prevState: { timezone: SupportedTimezone },
	formData: FormData
) => {
	const parsedTz = timezone.safeParse(formData.get("timezone"));

	if (!parsedTz.success || parsedTz.data === prevState.timezone) {
		return prevState;
	}

	const session = await auth();

	const userId = session?.user?.id;

	if (!userId) {
		return prevState;
	}

	const [result] = await upsertTimezone({ timezone: parsedTz.data, userId });

	if (!result?.timezone) {
		return prevState;
	}

	revalidatePath("/settings");

	return { timezone: result.timezone };
};
