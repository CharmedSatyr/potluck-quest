"use server";

import { revalidatePath } from "next/cache";
import { signIn } from "~/auth";

const signInWithDiscordAndRevalidate = async () => {
	await signIn("discord");

	revalidatePath("/", "layout");
};

export default signInWithDiscordAndRevalidate;
