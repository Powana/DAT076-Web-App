import express from "express";
import { pollRouter } from "./router/pollrouter";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors())
app.use("/poll", pollRouter);