import { z } from "zod";
import findProviderAccountIdByUserId from "~/actions/user/find-provider-account-id-by-user-id";
import { schema } from "~/actions/user/find-provider-account-id-by-user-id.schema";
import db from "~/db/connection";

jest.mock("~/db/connection", () => ({
	select: jest.fn(),
}));

describe("findProviderAccountIdByUserId", () => {
	const validInput: z.infer<typeof schema> = {
		userId: "4a44ed5a-fd4a-4a16-bddc-4aef1b175899",
	};
	const providerAccountId = "valid-provider-id";

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns user ID when a matching account is found", async () => {
		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockResolvedValueOnce([{ providerAccountId }]),
			}),
		});

		const result = await findProviderAccountIdByUserId(validInput);

		expect(result).toEqual([{ providerAccountId }]);
		expect(db.select).toHaveBeenCalledWith({
			providerAccountId: expect.anything(),
		});
	});

	it("returns an empty array when no matching account is found", async () => {
		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockResolvedValueOnce([]),
			}),
		});

		const result = await findProviderAccountIdByUserId(validInput);

		expect(result).toEqual([]);
		expect(db.select).toHaveBeenCalledWith({
			providerAccountId: expect.anything(),
		});
	});

	it("logs an error and returns an empty array on database error", async () => {
		const consoleSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		(db.select as jest.Mock).mockReturnValueOnce({
			from: jest.fn().mockReturnValueOnce({
				where: jest.fn().mockRejectedValueOnce(new Error("Database error")),
			}),
		});

		const result = await findProviderAccountIdByUserId(validInput);

		expect(result).toEqual([]);
		expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
		expect(db.select).toHaveBeenCalledWith({
			providerAccountId: expect.anything(),
		});

		consoleSpy.mockRestore();
	});
});
