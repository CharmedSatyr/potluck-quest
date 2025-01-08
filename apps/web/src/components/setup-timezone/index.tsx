"use client";

import { useEffect } from "react";
import setDefaultTimezoneAction from "~/components/setup-timezone/set-default-timezone-action";
import { DEFAULT_TIMEZONE } from "~/constants/timezone";
import useTimezone from "~/hooks/use-timezone";
import { timezone } from "~/validation/timezone.schema";

/** Sets timezone used for Discord bot functionality. */
const SetupTimezone = () => {
	const { timezone: detectedTimezone } = useTimezone();

	useEffect(() => {
		(async () => {
			const parsed = timezone.safeParse(detectedTimezone);

			if (!parsed.success) {
				await setDefaultTimezoneAction(DEFAULT_TIMEZONE);
				return;
			}

			await setDefaultTimezoneAction(parsed.data);
		})();
	}, [detectedTimezone]);

	return null;
};

export default SetupTimezone;
