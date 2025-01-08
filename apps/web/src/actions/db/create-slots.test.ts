import { ZodError } from "zod";
import createSlots from "~/actions/db/create-slots";
import findEvent from "~/actions/db/find-event";
import db from "~/db/connection";
import { slot } from "~/db/schema/slot";

jest.mock("~/db/connection");
jest.mock("~/actions/db/find-event");

describe("createSlots", () => {
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

	const validData: any = {
		code: "CODE1",
		slots: [
			{ count: 5, item: "Banana", order: 1 },
			{ count: 3, item: "Apple", order: 2 },
		],
	};

	const invalidData: any = {
		code: "CODE1",
		slots: [{ count: 5, item: 123, order: "apple" }],
	};

	it("should insert slots into the database and return the created ids on success", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([{ id: 1 }]);

		(db.insert as jest.Mock).mockReturnValueOnce({
			values: jest.fn().mockReturnValueOnce({
				returning: jest.fn().mockResolvedValueOnce([{ id: 1 }, { id: 2 }]),
			}),
		});

		const result = await createSlots(validData);

		expect(findEvent).toHaveBeenCalledWith({ code: validData.code });
		expect(db.insert).toHaveBeenCalledWith(slot);
		expect(result).toEqual([{ id: 1 }, { id: 2 }]);
	});

	it("should return an empty array if event is not found", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([]);

		const result = await createSlots(validData);

		expect(findEvent).toHaveBeenCalledWith({ code: validData.code });
		expect(result).toEqual([]);
	});

	it("should log an error and return an empty array if schema validation fails", async () => {
		const error = new ZodError([
			{
				code: "invalid_type",
				expected: "string",
				received: "number",
				path: ["slots", 0, "item"],
				message: "Expected string, received number",
			},
			{
				code: "invalid_type",
				expected: "number",
				received: "nan",
				path: ["slots", 0, "order"],
				message: "Expected number, received nan",
			},
		]);

		const result = await createSlots(invalidData);

		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
	});

	it("should log an error and return an empty array if db insertion fails", async () => {
		(findEvent as jest.Mock).mockResolvedValueOnce([{ id: 1 }]);

		(db.insert as jest.Mock).mockReturnValueOnce({
			values: jest.fn().mockReturnValueOnce({
				returning: jest.fn().mockRejectedValueOnce(new Error("DB Error")),
			}),
		});

		const result = await createSlots(validData);

		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(new Error("DB Error"));
	});
});
