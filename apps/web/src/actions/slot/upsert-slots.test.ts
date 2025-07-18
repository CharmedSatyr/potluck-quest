import { z, ZodError } from "@potluck/utilities/validation";
import findEvent from "~/actions/event/find-event";
import upsertSlots from "~/actions/slot/upsert-slots";
import { schema } from "~/actions/slot/upsert-slots.schema";
import db from "~/db/connection";
import { slot } from "~/db/schema/slot";

jest.mock("~/db/connection");
jest.mock("~/actions/event/find-event");

describe("upsertSlots", () => {
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
		slots: [
			{ count: 5, item: "Apple", id, order: 1 },
			{ count: 3, item: "Banana", id, order: 2 },
		],
	};

	const invalidData = {
		code: "CODE1",
		slots: [{ count: 0, item: "", order: "apple" }],
	} as unknown as z.infer<typeof schema>;

	it("should insert slots into the database and return the created ids on success", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([{ id: "123" }]);

		const returning = [
			{ count: 5, item: "Apple", id, order: 1 },
			{ count: 3, item: "Banana", id, order: 2 },
		];

		(db.insert as jest.Mock).mockReturnValueOnce({
			values: jest.fn().mockReturnValueOnce({
				onConflictDoUpdate: jest.fn().mockReturnValueOnce({
					returning: jest.fn().mockResolvedValueOnce(returning),
				}),
			}),
		});

		const result = await upsertSlots(validData);

		expect(findEvent).toHaveBeenCalledWith({ code: validData.code });
		expect(db.insert).toHaveBeenCalledWith(slot);
		expect(result).toEqual(returning);
	});

	it("should return an empty array if event is not found", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([]);

		const result = await upsertSlots(validData);

		expect(findEvent).toHaveBeenCalledWith({ code: validData.code });
		expect(result).toEqual([]);
	});

	it("should log an error and return an empty array if schema validation fails", async () => {
		const result = await upsertSlots(invalidData);

		expect(result).toEqual([]);
		expect(errorLogger.mock.calls[0][0]).toBeInstanceOf(ZodError);
		expect(errorLogger.mock.calls[0][0].issues).toHaveLength(3);
		expect(errorLogger.mock.calls[0][0].issues[0].message).toContain(
			"Too small: expected number to be >=1"
		);
		expect(errorLogger.mock.calls[0][0].issues[1].message).toContain(
			"Too small: expected string to have >=1 characters"
		);
		expect(errorLogger.mock.calls[0][0].issues[2].message).toContain(
			"Invalid input: expected number, received NaN"
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

		const result = await upsertSlots(validData);

		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(new Error("DB Error"));
	});
});
