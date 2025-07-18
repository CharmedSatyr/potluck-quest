import { ZodError } from "@potluck/utilities/validation";
import createCommitment from "~/actions/commitment/create-commitment";
import db from "~/db/connection";
import { commitment } from "~/db/schema/commitment";

jest.mock("~/db/connection");

describe("createCommitment", () => {
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
		createdBy: "123e4567-e89b-12d3-a456-426614174000",
		description: "This is a valid test commitment",
		quantity: 10,
		slotId: "123e4567-e89b-12d3-a456-426614174001",
	};

	it("should insert valid data into the database and return the id on success", async () => {
		(db.insert as jest.Mock).mockReturnValueOnce({
			values: jest.fn().mockReturnValueOnce({
				returning: jest.fn().mockResolvedValueOnce([{ id: 1 }]),
			}),
		});

		const result = await createCommitment(validData);

		expect(db.insert).toHaveBeenCalledWith(commitment);
		expect(result).toEqual([{ id: 1 }]);
	});

	it("should throw an error if invalid data is provided", async () => {
		const invalidData = {
			createdBy: "invalid-uuid",
			description: "This description is too long".repeat(20),
			quantity: -10,
			slotId: "also-invalid-uuid",
		};

		const result = await createCommitment(invalidData);

		expect(db.insert).not.toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger.mock.calls[0][0]).toBeInstanceOf(ZodError);
		expect(errorLogger.mock.calls[0][0].issues).toHaveLength(4);
		expect(errorLogger.mock.calls[0][0].issues[0].message).toContain(
			"Invalid UUID"
		);
		expect(errorLogger.mock.calls[0][0].issues[1].message).toContain(
			"Too big: expected string to have <=100 characters"
		);
		expect(errorLogger.mock.calls[0][0].issues[2].message).toContain(
			"Too small: expected number to be >=1"
		);
		expect(errorLogger.mock.calls[0][0].issues[3].message).toContain(
			"Invalid UUID"
		);
	});

	it("should return an empty array and log an error if db insertion fails", async () => {
		const error = new Error("DB Error");

		(db.insert as jest.Mock).mockReturnValueOnce({
			values: jest.fn().mockReturnValueOnce({
				returning: jest.fn().mockRejectedValueOnce(error),
			}),
		});

		const result = await createCommitment(validData);

		expect(db.insert).toHaveBeenCalledWith(commitment);
		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
	});
});
