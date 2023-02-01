import express from "express";
import { pollRouter } from "./router/pollrouter";

export const app = express();

app.use(express.json());
app.use("/poll", pollRouter);