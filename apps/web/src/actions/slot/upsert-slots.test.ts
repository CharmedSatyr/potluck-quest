import { z, ZodError } from "zod";
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
		const error = new ZodError([
			{
				code: "too_small",
				minimum: 1,
				type: "number",
				inclusive: true,
				exact: false,
				message: "Number must be greater than or equal to 1",
				path: ["slots", 0, "count"],
			},
			{
				code: "too_small",
				minimum: 1,
				type: "string",
				inclusive: true,
				exact: false,
				message: "String must contain at least 1 character(s)",
				path: ["slots", 0, "item"],
			},
			{
				code: "invalid_type",
				expected: "number",
				received: "nan",
				path: ["slots", 0, "order"],
				message: "Expected number, received nan",
			},
		]);

		const result = await upsertSlots(invalidData);

		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
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
