import { Request, Response, NextFunction } from "express";
import envConfig from "~/constants/env-config";

const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers["x-api-key"] !== envConfig.PQ_WEB_TO_BOT_API_KEY) {
		res.status(401).send();
		return;
	}

	next();
};

export default verifyApiKey;
