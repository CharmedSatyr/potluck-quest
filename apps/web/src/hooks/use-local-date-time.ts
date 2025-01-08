"use client";

import { DateTime } from "luxon";
import { useMemo } from "react";
import useTimezone from "~/hooks/use-timezone";

export const useLocalDateTime = (utcMs: number) => {
	const { timezone, offsetNameShort } = useTimezone();

	const dt = useMemo(
		() => DateTime.fromMillis(utcMs, { zone: timezone }),
		[utcMs, timezone]
	);

	if (!dt.isValid) {
		throw new Error("Invalid date");
	}

	const date = useMemo(() => dt.toLocaleString(DateTime.DATE_FULL), [dt]);
	const dateIso = useMemo(() => dt.toISODate(), [dt]);
	const time = useMemo(() => dt.toLocaleString(DateTime.TIME_SIMPLE), [dt]);
	const time24 = useMemo(
		() => dt.toLocaleString(DateTime.TIME_24_SIMPLE).concat(":00"),
		[dt]
	);

	return { date, dateIso, time, time24, offsetNameShort };
};
