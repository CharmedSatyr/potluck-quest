import express from "express";
import verifyApiKey from "~/middleware/verify-api-key";
import eventRouter from "~/routes/event";
import userRouter from "~/routes/user";

const app = express();

app.use(express.json());
app.use(verifyApiKey);
app.use("/api/event", eventRouter);
app.use("/api/user", userRouter);

export default app;
