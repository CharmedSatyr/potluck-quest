"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import deleteEvent from "~/actions/event/delete-event";
import findEventCreatedBy from "~/actions/event/find-event-created-by";
import { auth } from "~/auth";
import { DeleteEventState } from "~/components/delete-event-button/delete-event-action.types";

const deleteEventAction = async (
	prevState: DeleteEventState
): Promise<DeleteEventState> => {
	const session = await auth();
	const [createdBy] = await findEventCreatedBy({ code: prevState.code });

	if (!session?.user?.id || session.user.id !== createdBy?.id) {
		return { ...prevState, success: false };
	}

	const [id] = await deleteEvent({
		code: prevState.code,
	});

	if (!id) {
		return {
			...prevState,
			success: false,
		};
	}

	revalidatePath("/my-events", "page");

	if (prevState.redirect) {
		redirect("/dashboard");
	}

	return {
		...prevState,
		success: true,
	};
};

export default deleteEventAction;
