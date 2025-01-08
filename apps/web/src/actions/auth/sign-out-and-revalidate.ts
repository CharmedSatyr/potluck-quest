"use server";

import { revalidatePath } from "next/cache";
import { signOut } from "~/auth";

const signOutAndRevalidate = async () => {
	await signOut({ redirectTo: "/" });

	revalidatePath("/", "layout");
};

export default signOutAndRevalidate;
