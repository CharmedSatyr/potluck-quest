import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import db from "~/db/connection";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [Discord],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/oauth",
	},
});
