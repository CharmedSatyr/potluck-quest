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

		const error = new ZodError([
			{
				validation: "uuid",
				code: "invalid_string",
				message: "Invalid uuid",
				path: ["createdBy"],
			},
			{
				code: "too_big",
				maximum: 100,
				type: "string",
				inclusive: true,
				exact: false,
				message: "String must contain at most 100 character(s)",
				path: ["description"],
			},
			{
				code: "too_small",
				minimum: 1,
				type: "number",
				inclusive: true,
				exact: false,
				message: "Number must be greater than or equal to 1",
				path: ["quantity"],
			},
			{
				validation: "uuid",
				code: "invalid_string",
				message: "Invalid uuid",
				path: ["slotId"],
			},
		]);

		const result = await createCommitment(invalidData);

		expect(db.insert).not.toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
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
