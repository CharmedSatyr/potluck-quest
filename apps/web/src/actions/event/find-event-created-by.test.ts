import { ZodError } from "@potluck/utilities/validation";
import findEventCreatedBy from "~/actions/event/find-event-created-by";
import db from "~/db/connection";

jest.mock("~/db/connection");

describe("findEventCreatedBy", () => {
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
		code: "CODE1",
	};

	it("should find an event and return it on success", async () => {
		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockReturnValueOnce({
					limit: jest.fn().mockResolvedValueOnce([{ code: validData.code }]),
				}),
			}),
		});

		const result = await findEventCreatedBy(validData);

		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual([{ code: validData.code }]);
	});

	it("should throw an error if invalid data is provided", async () => {
		const invalidData = {
			code: "",
		};

		const result = await findEventCreatedBy(invalidData);

		expect(db.select).not.toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger.mock.calls[0][0]).toBeInstanceOf(ZodError);
		expect(errorLogger.mock.calls[0][0].issues).toHaveLength(1);
		expect(errorLogger.mock.calls[0][0].issues[0].message).toContain(
			"Too small: expected string to have >=5 characters"
		);
	});

	it("should return an empty array and log an error if db retrieval fails", async () => {
		const error = new Error("DB Error");

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockReturnValueOnce({
					limit: jest.fn().mockRejectedValueOnce(error),
				}),
			}),
		});

		const result = await findEventCreatedBy(validData);

		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
	});
});
