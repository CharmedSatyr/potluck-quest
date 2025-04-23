import { Request, Response, NextFunction } from "express";
import envConfig from "~/constants/env-config.js";

const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers["x-api-key"] !== envConfig.PQ_WEB_TO_BOT_API_KEY) {
		res.sendStatus(401);
		return;
	}

	next();
};

export default verifyApiKey;
