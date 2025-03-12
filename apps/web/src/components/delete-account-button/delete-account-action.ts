"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import deleteUser from "~/actions/user/delete-user";
import { auth } from "~/auth";
import { DeleteAccountState } from "~/components/delete-account-button/delete-account-action.types";

const deleteAccountAction = async (
	prevState: DeleteAccountState,
	_payload: FormData
): Promise<DeleteAccountState> => {
	const session = await auth();

	if (!session?.user?.id) {
		return { ...prevState, error: true };
	}

	const result = await deleteUser({ userId: session.user.id });
	if (!result) {
		return { ...prevState, error: true };
	}

	revalidatePath("/", "layout");

	redirect("/");
};

export default deleteAccountAction;
