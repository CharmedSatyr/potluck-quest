import { redirect } from "next/navigation";
import findEvent from "~/actions/event/find-event";
import findEventExistsRedirect from "~/components/start-cta/goto-event-form/find-event-exists-redirect";

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));
jest.mock("~/actions/event/find-event");

describe("findEventExistsRedirect", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should redirect to the event page when a valid event code is provided", async () => {
		const formData = new FormData();
		formData.append("code", "CODE1");

		(findEvent as jest.Mock).mockResolvedValueOnce([{ code: "CODE1" }]);

		const result = await findEventExistsRedirect(
			{
				code: "CODE1",
				message: "",
				success: false,
			},
			formData
		);

		expect(result).toBeUndefined();
		expect(redirect).toHaveBeenCalledWith("/event/CODE1");
	});

	it("should return an error message when the event code is invalid", async () => {
		const formData = new FormData();
		formData.append("code", "WRONG");

		(findEvent as jest.Mock).mockResolvedValueOnce([]);

		const result = await findEventExistsRedirect(
			{
				code: "WRONG",
				message: "",
				success: false,
			},
			formData
		);

		expect(result).toEqual({
			code: "WRONG",
			message: "Event code not found.",
			success: false,
		});
		expect(redirect).not.toHaveBeenCalled();
	});

	it("should return an error message when the event code does not exist", async () => {
		const formData = new FormData();
		formData.append("code", "WRONG");

		(findEvent as jest.Mock).mockResolvedValueOnce([]);

		const result = await findEventExistsRedirect(
			{
				code: "WRONG",
				message: "",
				success: false,
			},
			formData
		);

		expect(result).toEqual({
			code: "WRONG",
			message: "Event code not found.",
			success: false,
		});
		expect(redirect).not.toHaveBeenCalled();
	});
});
