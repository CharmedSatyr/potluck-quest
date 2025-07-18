"use server";

import { ZodError } from "@potluck/utilities/validation";
import findEvent from "~/actions/event/find-event";
import findRsvpsByEvent from "~/actions/rsvp/find-rsvps-by-event";
import db from "~/db/connection";

jest.mock("~/db/connection");
jest.mock("~/actions/event/find-event");

describe("findSlots", () => {
	let errorLogger: jest.SpyInstance;

	beforeAll(() => {
		errorLogger = jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterAll(() => {
		errorLogger.mockRestore();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const id = "605428d7-e305-40c2-8e30-68ead5d7e85b";

	const validData = { eventCode: "CODE1" };

	it("should return RSVPs for a valid event code", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([{ id: 1 }]);

		const rsvps = [
			{ id, createdBy: id, eventId: id, response: "yes" },
			{ id, createdBy: id, eventId: id, response: "no" },
			{ id, createdBy: id, eventId: id, response: "yes" },
			{ id, createdBy: id, eventId: id, response: "no" },
		];

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockResolvedValueOnce(rsvps),
			}),
		});

		const result = await findRsvpsByEvent(validData);

		expect(findEvent).toHaveBeenCalledWith({ code: validData.eventCode });
		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual(rsvps);
	});

	it("should return an empty array and log an error if the event code is invalid", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([]);

		const result = await findRsvpsByEvent(validData);

		expect(result).toEqual([]);
		expect(findEvent).toHaveBeenCalledWith({ code: validData.eventCode });
	});

	it("should return an empty array and log a ZodError if schema validation fails", async () => {
		const invalidData = { eventCode: "BAD" };

		const result = await findRsvpsByEvent(invalidData);

		expect(result).toEqual([]);
		expect(findEvent).not.toHaveBeenCalled();
		expect(errorLogger.mock.calls[0][0]).toBeInstanceOf(ZodError);
		expect(errorLogger.mock.calls[0][0].issues).toHaveLength(1);
		expect(errorLogger.mock.calls[0][0].issues[0].message).toContain(
			"Too small: expected string to have >=5 characters"
		);
	});

	it("should return an empty array and log an error if db query fails", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([{ id: 1 }]);

		const error = new Error("DB Error");

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockRejectedValueOnce(error),
			}),
		});

		const result = await findRsvpsByEvent(validData);

		expect(findEvent).toHaveBeenCalledWith({ code: validData.eventCode });
		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
	});
});
