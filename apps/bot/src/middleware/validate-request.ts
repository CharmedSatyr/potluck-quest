import { z } from "@potluck/utilities/validation";
import { Request, Response, NextFunction } from "express";

const sendInvalidParamsResponse = (error: z.ZodError, res: Response) => {
	res.status(400).json({
		message: "Invalid parameters",
		errors: error.flatten().fieldErrors,
	});
};

const validateRequest =
	(schema: z.ZodSchema) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const dataSource =
			req.method === "GET" || req.method === "DELETE" ? req.query : req.body;

		try {
			const parsed = schema.parse(dataSource);

			if (req.method === "GET" || req.method === "DELETE") {
				req.query = parsed;
			} else {
				req.body = parsed;
			}

			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				return sendInvalidParamsResponse(error, res);
			}

			console.error("Error validating request:", error);

			res.status(500).send();
		}
	};

export default validateRequest;
