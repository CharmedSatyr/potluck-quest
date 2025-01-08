"use client";

import { DateTime } from "luxon";

const useTimezone = () => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const offsetNameShort = DateTime.now().setZone(timezone).offsetNameShort;

	return {
		timezone,
		offsetNameShort,
	};
};

export default useTimezone;
