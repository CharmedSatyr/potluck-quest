import { z } from "@potluck/utilities/validation";
import { Request, Response, NextFunction } from "express";
import validateRequest from "~/middleware/validate-request.js";

describe("validateRequest middleware", () => {
	let req: Partial<Request>;
	let res: Response;
	let next: jest.Mock;
	const schema = z.object({ name: z.string() });

	const mockResponse = () => {
		const res: Partial<Response> = {};
		res.status = jest.fn().mockReturnThis();
		res.json = jest.fn().mockReturnThis();
		res.send = jest.fn();
		return res as Response;
	};

	beforeEach(() => {
		req = { method: "POST", body: {} };
		res = mockResponse();
		next = jest.fn();
	});

	it("should call next when request body is valid", () => {
		req.body = { name: "John Doe" };

		validateRequest(schema)(req as Request, res, next as NextFunction);

		expect(next).toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
	});

	it("should return 400 when request body is invalid", () => {
		req.body = { name: 123 };

		validateRequest(schema)(req as Request, res, next as NextFunction);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({ message: "Invalid parameters" })
		);
		expect(next).not.toHaveBeenCalled();
	});

	it("should validate query parameters for GET requests", () => {
		req.method = "GET";
		req.query = { name: "John Doe" };

		validateRequest(schema)(req as Request, res, next as NextFunction);

		expect(next).toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
	});

	it("should return 400 for invalid query parameters in GET requests", () => {
		req.method = "GET";
		req.query = { name: 123 as unknown as string };

		validateRequest(schema)(req as Request, res, next as NextFunction);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({ message: "Invalid parameters" })
		);
		expect(next).not.toHaveBeenCalled();
	});

	it("should handle unexpected errors and return 500", () => {
		const brokenSchema = {
			parse: jest.fn(() => {
				throw new Error("Unexpected error");
			}),
		};

		validateRequest(brokenSchema as unknown as z.ZodSchema)(
			req as Request,
			res,
			next as NextFunction
		);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});
});
