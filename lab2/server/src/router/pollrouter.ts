import express, { Request, Response } from "express";
import { PollService } from "../service/poll";
import { Poll } from "../model/poll";
import { Choice } from "../model/choice";

export const pollRouter = express.Router();
const pollService = new PollService();

pollRouter.route("/")
    .get((req : Request, res : Response) => {
        try {
            // const tasks = await taskService.getTasks();
            if (PollService.thePoll == null) {  // At the moment, only allow for one poll for simple testing purposes.
                res.status(200).send("No poll has been created"); //PollService.thePoll);

            }
            else {
                res.status(200).send(PollService.thePoll.question)
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
    .post((req : Request, res : Response) => {
        try {
            
            const question: string = req.body["question"]
            const choices_strs: Array<string> = req.body["choices"] 
            if (choices_strs.length != 3) {
                res.status(400).send("Polls must have 3 choices")
            }
            const choices = new Array<Choice>(new Choice(choices_strs[0]), new Choice(choices_strs[1]), new Choice(choices_strs[2]))
            const newPoll = new Poll(question, choices);
            
            PollService.thePoll = newPoll;
            console.log("choice #1:", choices)
            console.log("newPOll:", newPoll)
            
            res.status(201).send(newPoll);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

