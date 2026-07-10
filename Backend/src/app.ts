import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";

app.use("/task", authRouter);
app.use("/task", taskRouter);

export { app };
