import type { SupportedTimezone } from "@potluck/utilities/types";
import * as chrono from "chrono-node";
import { DateTime } from "luxon";

export const getTimezoneOffsetName = (
	timezone: SupportedTimezone
): { offsetNameLong: string; offsetNameShort: string } => {
	let dt = DateTime.now().setZone(timezone) as DateTime<true>;

	const { offsetNameLong, offsetNameShort } = dt;

	return {
		offsetNameLong,
		offsetNameShort,
	};
};

export const formatTimestampForPlan = (
	startUtcMs: number,
	timezone: SupportedTimezone
): { date: string; time: string } => {
	const startDt = DateTime.fromMillis(startUtcMs, { zone: timezone });

	return {
		date: startDt.toLocaleString(DateTime.DATE_HUGE),
		time: startDt.toLocaleString(DateTime.TIME_SIMPLE),
	};
};

export const formatTimestampForView = (
	utcMs: number | null,
	timezone: SupportedTimezone
): string => {
	if (!utcMs) {
		return " ・ ";
	}

	const dt = DateTime.fromMillis(utcMs, { zone: timezone });

	const day = dt.get("day");
	const month = dt.setLocale("en-US").toLocaleString({ month: "short" });
	const weekday = dt.setLocale("en-US").toLocaleString({ weekday: "short" });

	const getOrdinalSuffix = (n: number): string => {
		if (n % 10 === 1 && n % 100 !== 11) return "st";
		if (n % 10 === 2 && n % 100 !== 12) return "nd";
		if (n % 10 === 3 && n % 100 !== 13) return "rd";
		return "th";
	};

	const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

	const time = dt.toLocaleString(DateTime.TIME_SIMPLE);

	return `${weekday} ${month} ${dayWithSuffix}・${time}`;
};

export const parseDateTimeInputForServices = (
	dateTimeInput: string,
	timezone: SupportedTimezone
): {
	startDate: string;
	startUtcMs: number;
	startTime: string;
	endDate: string;
	endTime: string;
	endUtcMs: number;
} | null => {
	const { offsetNameShort } = getTimezoneOffsetName(timezone);

	const parsed = chrono.parse(
		dateTimeInput,

		{
			instant: new Date(),
			/**
			 * Chrono maps timezone abbreviations to second offsets.
			 * See https://github.com/wanasit/chrono/blob/master/src/timezone.ts
			 */
			timezone: offsetNameShort,
		},
		{ forwardDate: true }
	)[0];

	if (!parsed) {
		return null;
	}

	const start = parsed.start.date();
	const end = parsed.end?.date();

	const startDt = DateTime.fromJSDate(start, { zone: timezone });
	const endDt = end
		? DateTime.fromJSDate(end, { zone: timezone })
		: startDt.plus({ hours: 1 }); // DEFAULT to 1 hour duration

	if (startDt <= DateTime.now()) {
		return null;
	}

	if (startDt > endDt) {
		return null;
	}

	return {
		endDate: endDt.toFormat("yyyy-MM-dd"),
		endTime: endDt.toFormat("HH:mm:ss"),
		endUtcMs: endDt.toUTC().toMillis(),
		startDate: startDt.toFormat("yyyy-MM-dd"),
		startTime: startDt.toFormat("HH:mm:ss"),
		startUtcMs: startDt.toUTC().toMillis(),
	};
};
