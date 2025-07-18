import { z, ZodError } from "@potluck/utilities/validation";
import findEvent from "~/actions/event/find-event";
import upsertRsvp from "~/actions/rsvp/upsert-rsvp";
import { schema } from "~/actions/rsvp/upsert-rsvp.schema";
import db from "~/db/connection";
import { rsvp } from "~/db/schema/rsvp";

jest.mock("~/db/connection");
jest.mock("~/actions/event/find-event");

describe("upsertRsvp", () => {
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

	const id = "8059740a-d6ba-4215-807d-ea5502441bf1";

	const validData: z.infer<typeof schema> = {
		code: "CODE1",
		createdBy: id,
		message: "I will be late.",
		response: "yes",
	};

	const invalidData = {
		code: "CODE1",
		slots: [{ count: 0, item: "" }],
	} as unknown as z.infer<typeof schema>;

	it("should insert an RSVP into the database and return a success object on success", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([{ id: "123" }]);

		const returning = [{ id }];

		(db.insert as jest.Mock).mockReturnValueOnce({
			values: jest.fn().mockReturnValueOnce({
				onConflictDoUpdate: jest.fn().mockReturnValueOnce({
					returning: jest.fn().mockResolvedValueOnce(returning),
				}),
			}),
		});

		const result = await upsertRsvp(validData);

		expect(findEvent).toHaveBeenCalledWith({ code: validData.code });
		expect(db.insert).toHaveBeenCalledWith(rsvp);
		expect(result).toEqual({ success: true });
	});

	it("should return an failure response if event is not found", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([]);

		const result = await upsertRsvp(validData);

		expect(findEvent).toHaveBeenCalledWith({ code: validData.code });
		expect(result).toEqual({ success: false });
	});

	it("should log an error and return an empty array if schema validation fails", async () => {
		const result = await upsertRsvp(invalidData);

		expect(result).toEqual({ success: false });
		expect(errorLogger.mock.calls[0][0]).toBeInstanceOf(ZodError);
		expect(errorLogger.mock.calls[0][0].issues).toHaveLength(4);
		expect(errorLogger.mock.calls[0][0].issues[0].message).toContain(
			"Invalid input: expected string, received undefined"
		);
		expect(errorLogger.mock.calls[0][0].issues[1].message).toContain(
			"Invalid input: expected string, received undefined"
		);
		expect(errorLogger.mock.calls[0][0].issues[2].message).toContain(
			'Invalid option: expected one of "yes"|"no"'
		);
		expect(errorLogger.mock.calls[0][0].issues[3].message).toContain(
			'Unrecognized key: "slots"'
		);
	});

	it("should log an error and return an empty array if db insertion fails", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([{ id: "123" }]);

		(db.insert as jest.Mock).mockReturnValueOnce({
			values: jest.fn().mockReturnValueOnce({
				onConflictDoUpdate: jest.fn().mockReturnValueOnce({
					returning: jest.fn().mockRejectedValueOnce(new Error("DB Error")),
				}),
			}),
		});

		const result = await upsertRsvp(validData);

		expect(result).toEqual({ success: false });
		expect(errorLogger).toHaveBeenCalledWith(new Error("DB Error"));
	});
});
