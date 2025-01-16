import verifyApiKeyMiddleware from "./utilities/verify-api-key-middleware";
import express from "express";
import eventRouter from "~/routes/event";
import userRouter from "~/routes/user";

const app = express();

app.use(verifyApiKeyMiddleware);
app.use("/api/event", eventRouter);
app.use("/api/user", userRouter);

export default app;
