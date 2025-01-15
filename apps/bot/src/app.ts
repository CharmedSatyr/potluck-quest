import verifyApiKeyMiddleware from "./utilities/verify-api-key-middleware";
import express from "express";
import eventRouter from "~/routes/event";

const app = express();

app.use(verifyApiKeyMiddleware);
app.use("/api/event", eventRouter);

export default app;
