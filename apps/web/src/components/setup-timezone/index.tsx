"use client";

import { DEFAULT_TIMEZONE } from "@potluck/shared/constants";
import { SupportedTimezones } from "@potluck/shared/types";
import { timezone, z } from "@potluck/shared/validation";
import { useEffect } from "react";
import setDefaultTimezoneAction from "~/components/setup-timezone/set-default-timezone-action";
import useTimezone from "~/hooks/use-timezone";

/** Sets timezone used for Discord bot functionality. */
const SetupTimezone = () => {
	const { timezone: detectedTimezone } = useTimezone();

	useEffect(() => {
		(async () => {
			const parsed = (timezone as z.ZodEnum<SupportedTimezones>).safeParse(
				detectedTimezone
			);

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
