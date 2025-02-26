import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import envConfig from "~/constants/env-config";
import db from "~/db/connection";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [Discord],
	secret: envConfig.AUTH_SECRET,
	pages: {
		signIn: "/oauth",
	},
});
