import { ZodError } from "@potluck/utilities/validation";
import findEventsByUser from "~/actions/event/find-events-by-user";
import db from "~/db/connection";

jest.mock("~/db/connection");

describe("findEventsByUser", () => {
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

	const validData = {
		createdBy: "d743bbd0-3e7f-42c7-9e05-4b77f0c7d730",
	};

	it("should find events and return them on success", async () => {
		const data = [
			{ createdBy: validData.createdBy, data: "other" },
			{ createdBy: validData.createdBy, data: "more" },
		];

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockReturnValueOnce({
					orderBy: jest.fn().mockReturnValueOnce(data),
				}),
			}),
		});

		const result = await findEventsByUser(validData);

		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual(data);
	});

	it("should throw an error if invalid data is provided", async () => {
		const invalidData = {
			createdBy: "",
		};

		const result = await findEventsByUser(invalidData);

		expect(db.select).not.toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger.mock.calls[0][0]).toBeInstanceOf(ZodError);
		expect(errorLogger.mock.calls[0][0].issues).toHaveLength(1);
		expect(errorLogger.mock.calls[0][0].issues[0].message).toContain(
			"Invalid UUID"
		);
	});

	it("should return an empty array and log an error if db retrieval fails", async () => {
		const error = new Error("DB Error");

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockReturnValueOnce({
					orderBy: jest.fn().mockRejectedValueOnce(error),
				}),
			}),
		});

		const result = await findEventsByUser(validData);

		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
	});
});
