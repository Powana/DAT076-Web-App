import * as SuperTest from "supertest";
import { app } from "./start";
import { Poll } from "./model/poll";
import { IChoice } from "./model/choice";


const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const desc = "Question?";
    const pollchoices = ["A", "B", "C"]
    const res1 = await request.put("/poll").send({question : desc,choices:pollchoices});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.description).toEqual(desc);
    const res2 = await request.get("/poll");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((poll : Poll) => poll.question)).toContain(desc);
});
