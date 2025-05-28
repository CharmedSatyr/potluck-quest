"use server";

import { z } from "@potluck/utilities/validation";
import { getTableColumns, SQL, sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/slot/upsert-slots.schema";
import db from "~/db/connection";
import { slot } from "~/db/schema/slot";

const buildConflictUpdateColumns = <
	T extends PgTable,
	Q extends keyof T["_"]["columns"],
>(
	table: T,
	columns: Q[]
) => {
	const cls = getTableColumns(table);

	return columns.reduce(
		(acc, column) => {
			const colName = cls[column].name;
			acc[column] = sql.raw(`excluded.${colName}`);

			return acc;
		},
		{} as Record<Q, SQL>
	);
};

const upsertSlots = async (
	data: z.infer<typeof schema>
): Promise<{ item: Slot["item"]; count: Slot["count"]; id: Slot["id"] }[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return [];
		}

		const values = data.slots.map((slot) => ({
			...slot,
			eventId: event.id,
		}));

		return await db
			.insert(slot)
			.values(values)
			.onConflictDoUpdate({
				target: slot.id,
				set: buildConflictUpdateColumns(slot, ["count", "item"]),
			})
			.returning({
				item: slot.item,
				count: slot.count,
				id: slot.id,
			});
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default upsertSlots;
