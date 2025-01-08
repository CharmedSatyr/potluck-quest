import { slot } from "@/db/schema/slot";

declare global {
	type Slot = typeof slot.$inferSelect;

	type SlotData = {
		count: Slot["count"];
		id?: Slot["id"];
		item: Slot["item"];
		order: Slot["order"];
	};

	type NonEmptySlotDataArray = [SlotData, ...SlotData[]];
}
