import * as SuperTest from "supertest"
import {Poll} from "../model/poll.model"
import { app } from "../start"

const request = SuperTest.default(app)

test ("End-to-end test", async() =>{
    const quest= "Questions anyone?";
    const choi= ["A", "B", "C"];

    const res1 = await request.post("/poll").send({"question" : quest, "choices" : choi});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.question).toEqual(quest);
    const res2 = await request.get("/poll");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.question).toContain(quest)
    }
)