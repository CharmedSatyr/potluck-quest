"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import { DeleteAccountState } from "~/components/delete-account-button/delete-account-action.types";

const deleteAccountAction = async (
	prevState: DeleteAccountState,
	_payload: FormData
): Promise<DeleteAccountState> => {
	const session = await auth();

	if (!session?.user?.id) {
		return { ...prevState, success: false };
	}

	revalidatePath("/", "layout");

	redirect("/");
};

export default deleteAccountAction;
