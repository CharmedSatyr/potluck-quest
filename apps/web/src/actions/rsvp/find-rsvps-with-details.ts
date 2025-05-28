"use server";

import { z } from "@potluck/utilities/validation";
import { eq } from "drizzle-orm";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/rsvp/find-rsvps-with-details.schema";
import db from "~/db/connection";
import { user } from "~/db/schema/auth/user";
import { rsvp } from "~/db/schema/rsvp";

type RsvpsWithDetails = {
	id: Rsvp["id"];
	message: Rsvp["message"];
	response: Rsvp["response"];
	user: {
		id: User["id"];
		image: User["image"];
		name: User["name"];
	};
};

const findRsvpsWithDetails = async (
	data: z.infer<typeof schema>
): Promise<RsvpsWithDetails[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return [];
		}

		return await db
			.select({
				id: rsvp.id,
				message: rsvp.message,
				response: rsvp.response,
				user: {
					id: user.id,
					image: user.image,
					name: user.name,
				},
			})
			.from(rsvp)
			.where(eq(rsvp.eventId, event.id))
			.innerJoin(user, eq(user.id, rsvp.createdBy));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findRsvpsWithDetails;
