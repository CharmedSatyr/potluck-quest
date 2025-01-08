import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "~/db/config";
import { account } from "~/db/schema/auth/account";
import { session } from "~/db/schema/auth/session";
import { user } from "~/db/schema/auth/user";
import { commitment } from "~/db/schema/commitment";
import { event } from "~/db/schema/event";
import { rsvp } from "~/db/schema/rsvp";
import { settings } from "~/db/schema/settings";
import { slot } from "~/db/schema/slot";

const sql = neon(config.connectionString);

const schema = {
	account,
	commitment,
	event,
	rsvp,
	session,
	settings,
	slot,
	user,
};

const db = drizzle(sql, { schema });

export default db;
