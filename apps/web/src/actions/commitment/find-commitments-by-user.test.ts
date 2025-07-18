import { ZodError } from "@potluck/utilities/validation";
import findCommitmentsByUser from "~/actions/commitment/find-commitments-by-user";
import db from "~/db/connection";

jest.mock("~/db/connection");

describe("findCommitments", () => {
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
		id: "223e4567-e89b-12d3-a456-426614174000",
	};

	const mockCommitment = {
		createdAt: "2024-01-01",
		createdBy: "123e4567-e89b-12d3-a456-426614174000",
		description: "Mock description",
		id: 1,
		quantity: 5,
		slotId: 1,
		updatedAt: "2024-01-02",
	};

	it("should return commitments for valid data", async () => {
		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockReturnValueOnce([mockCommitment]),
			}),
		});

		const result = await findCommitmentsByUser(validData);

		expect(result).toEqual([mockCommitment]);
	});

	it("should log an error and return an empty array if invalid data is provided", async () => {
		const invalidData = { id: "BAD_ID" };

		const result = await findCommitmentsByUser(invalidData);

		expect(result).toEqual([]);
		expect(db.select).not.toHaveBeenCalled();
		expect(errorLogger.mock.calls[0][0]).toBeInstanceOf(ZodError);
		expect(errorLogger.mock.calls[0][0].issues).toHaveLength(1);
		expect(errorLogger.mock.calls[0][0].issues[0].message).toContain(
			"Invalid UUID"
		);
	});

	it("should return an empty array if the event is not found", async () => {
		const result = await findCommitmentsByUser(validData);

		expect(result).toEqual([]);
	});

	it("should log an error and return an empty array if the db query fails", async () => {
		const error = new Error("DB Error");

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockRejectedValueOnce(error),
			}),
		});

		const result = await findCommitmentsByUser(validData);

		expect(db.select).toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(errorLogger).toHaveBeenCalledWith(error);
	});
});
