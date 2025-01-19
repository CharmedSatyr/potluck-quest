export const diffEventData = (
	originalEventData: EventDataWithCtx,
	newEventData: EventData
): Partial<EventData> => {
	const differences: Record<string, string | number> = {};

	for (const key of Object.keys(originalEventData) as Array<
		keyof EventDataWithCtx
	>) {
		if (key === "createdBy" || key === "id") {
			continue;
		}

		if (originalEventData[key] === newEventData[key]) {
			continue;
		}

		if (newEventData[key] === undefined) {
			continue;
		}

		differences[key] = newEventData[key];
	}

	return differences;
};
