import { commitment } from "~/db/schema/commitment";

declare global {
	type Commitment = typeof commitment.$inferSelect;
}
