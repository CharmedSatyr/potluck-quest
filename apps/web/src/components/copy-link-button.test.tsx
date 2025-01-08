import { render, screen, fireEvent, act } from "@testing-library/react";
import { usePathname } from "next/navigation";
import CopyLinkButton from "~/components/copy-link-button";
import buildCurrentUrl from "~/utilities/build-current-url";

jest.mock("next/navigation", () => ({
	usePathname: jest.fn(),
}));

jest.mock("~/utilities/build-current-url", () => jest.fn());

describe("CopyLinkButton", () => {
	beforeAll(() => {
		jest.useFakeTimers();

		Object.defineProperty(navigator, "clipboard", {
			value: {
				writeText: jest.fn(),
			},
			writable: true,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	beforeEach(() => {
		(usePathname as jest.Mock).mockReturnValue("/sample-path");
		(buildCurrentUrl as jest.Mock).mockReturnValue(
			"http://example.com/sample-path"
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders with default text and icon", () => {
		render(<CopyLinkButton text="CODE1" />);

		expect(screen.getByText("CODE1")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it.skip("copies the URL to the clipboard and shows 'Copied' text on click", async () => {
		render(<CopyLinkButton text="CODE1" />);

		act(() => {
			fireEvent.click(screen.getByRole("button"));
		});

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
			"http://example.com/sample-path"
		);
		expect(screen.getByText("Copied")).toBeInTheDocument();
	});

	it.skip("resets to 'Copy Link' text after timeout", async () => {
		render(<CopyLinkButton text="CODE1" />);

		act(() => {
			fireEvent.click(screen.getByRole("button"));

			jest.runAllTimers();
		});

		expect(screen.getByText("Copy Link")).toBeInTheDocument();
	});
});
