"use server";

import { ZodError } from "@potluck/utilities/validation";
import findRsvpsByUser from "~/actions/rsvp/find-rsvps-by-user";
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

	const validData = { id };
	const invalidData = { eventCode: "BAD" } as unknown as { id: string };

	it("should return RSVPs for a valid user id", async () => {
		const rsvps = [
			{ createdBy: id, eventId: id, id, message: "", response: "yes" },
			{ createdBy: id, eventId: id, id, message: "", response: "no" },
			{ createdBy: id, eventId: id, id, message: "", response: "yes" },
			{ createdBy: id, eventId: id, id, message: "", response: "no" },
		];

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockResolvedValueOnce(rsvps),
			}),
		});

		const result = await findRsvpsByUser(validData);

		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual(rsvps);
	});

	it("should return an empty array and log an error if the event code is invalid", async () => {
		const result = await findRsvpsByUser(validData);

		expect(result).toEqual([]);
	});

	it("should return an empty array and log a ZodError if schema validation fails", async () => {
		const result = await findRsvpsByUser(invalidData);

		expect(result).toEqual([]);
		expect(errorLogger.mock.calls[0][0]).toBeInstanceOf(ZodError);
		expect(errorLogger.mock.calls[0][0].issues).toHaveLength(2);
		expect(errorLogger.mock.calls[0][0].issues[0].message).toContain(
			"Invalid input: expected string, received undefined"
		);
		expect(errorLogger.mock.calls[0][0].issues[1].message).toContain(
			'Unrecognized key: "eventCode"'
		);
	});

	it("should return an empty array and log an error if db query fails", async () => {
		const error = new Error("DB Error");

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockRejectedValueOnce(error),
			}),
		});

		const result = await findRsvpsByUser(validData);

		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
	});
});
