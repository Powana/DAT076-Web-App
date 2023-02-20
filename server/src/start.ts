import express from "express";
import { pollRouter } from "./router/pollrouter";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors())
app.use("/poll", pollRouter);

import * as path from "path";

app.use(express.static(path.join(__dirname, '../../client/build')));


app.get('/*', (req : express.Request, res : express.Response) => {

    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));

});

