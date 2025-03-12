import { eq } from "drizzle-orm";
import deleteUser from "~/actions/user/delete-user";
import db from "~/db/connection";
import { user } from "~/db/schema/auth/user";

jest.mock("~/db/connection");

describe("deleteUser", () => {
	let errorLogger: jest.SpyInstance;

	beforeAll(() => {
		errorLogger = jest.spyOn(console, "error").mockImplementation(() => {});
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		errorLogger.mockRestore();
	});

	const validUserId = "29c4e0c6-a393-4a00-b956-855f6400c4e8";

	it("should delete a user when given a valid userId", async () => {
		(db.delete as jest.Mock).mockReturnValue({
			where: jest.fn(),
		});

		const result = await deleteUser({ userId: validUserId });

		expect(db.delete).toHaveBeenCalledWith(user);

		expect(db.delete(user).where).toHaveBeenCalledWith(
			eq(user.id, validUserId)
		);

		expect(result).toBe(true);
	});

	it("should throw an error if userId is invalid", async () => {
		const result = await deleteUser({ userId: "" });

		expect(errorLogger).toHaveBeenCalled();
		expect(db.delete).not.toHaveBeenCalled();

		expect(result).toBe(false);
	});
});
