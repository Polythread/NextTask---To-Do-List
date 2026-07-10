import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route";

app.use("/todo", authRouter);

export { app };
