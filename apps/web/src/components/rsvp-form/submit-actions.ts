"use server";

import { revalidatePath } from "next/cache";
import deleteUserEventCommitments from "~/actions/db/delete-user-event-commitments";
import upsertRsvp from "~/actions/db/upsert-rsvp";
import { auth } from "~/auth";
import formSchema from "~/components/rsvp-form/submit-actions.schema";

export type RsvpFormState = {
	code: string;
	fields: { message: string };
	message: string;
	success: boolean;
};

const ERROR_MESSAGE: string = "There was a problem. Please try again.";

const submitAction = async (
	prevState: RsvpFormState,
	formData: FormData
): Promise<RsvpFormState> => {
	const message = String(formData.get("message"));
	const response = formData.get("response");

	const session = await auth();

	if (!session?.user?.id) {
		return {
			...prevState,
			fields: { message },
			message: ERROR_MESSAGE,
			success: false,
		};
	}

	const formatted = {
		code: prevState.code,
		createdBy: session.user.id,
		message,
		response,
	};
	const parsed = formSchema.safeParse(formatted);

	if (!parsed.success) {
		return {
			...prevState,
			fields: { message },
			message: ERROR_MESSAGE,
			success: false,
		};
	}

	const result = await upsertRsvp(parsed.data);

	if (!result.success) {
		return {
			...prevState,
			fields: { message },
			message: ERROR_MESSAGE,
			success: result.success,
		};
	}

	if (response === "no") {
		await deleteUserEventCommitments({
			createdBy: session.user.id,
			code: prevState.code,
		});
	}

	// TODO: We can probably just revalidate tag.
	revalidatePath(`/event/${prevState.code}`, "page");

	return {
		...prevState,
		fields: { message: "" },
		message: "",
		success: result.success,
	};
};

export default submitAction;
