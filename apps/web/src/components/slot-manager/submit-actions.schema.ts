import { z } from "zod";
import { schema } from "~/actions/db/create-commitment.schema";

export const createCommitmentFormSchema = schema
	.omit({ createdBy: true, slotId: true })
	.strip();

export type CreateCommitmentFormData = z.infer<
	typeof createCommitmentFormSchema
>;

export type CreateCommitmentFormState = {
	fields: Record<string, string>;
	message: string;
	path: string;
	slotId: string;
	success: boolean;
};

export type DeleteCommitmentFormState = {
	commitmentId: string;
	message: string;
	path: string;
	success: boolean;
};
