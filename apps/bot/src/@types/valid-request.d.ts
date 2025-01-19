import { Request } from "express";

declare global {
	interface ValidRequest<Body = unknown, Query = unknown> extends Request {
		body: Body;
		query: Query;
	}
}
