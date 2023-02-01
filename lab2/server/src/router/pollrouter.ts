import express, { Request, Response } from "express";
import { PollService } from "../service/pollservice";
import { Poll } from "../model/poll";
import { TextChoice } from "../model/choice";

export const pollRouter = express.Router();
const pollService = new PollService();

pollRouter.route("/")
    .get((req : Request, res : Response) => {
        try {
            if (PollService.thePoll == null) {  // At the moment, only allow for one poll for simple testing purposes.
                res.status(200).send("No poll has been created");

            }
            else {
                res.status(200).send(PollService.thePoll.question)
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
    .post((req : Request<{}, {}, {question: string, choices: Array<string>}>, res : Response<Poll | string>) => {
        try {
            const question: string = req.body["question"]
            const choices_strs: Array<string> = req.body["choices"] 
            
            if (question == null || choices_strs == null) {
                res.status(400).send("Invalid payload")
            }
            
            if (choices_strs.length != 3) {  // For demonstration purposes TODO: Remove
                res.status(400).send("Polls must have 3 choices")
            }

            let newPoll = pollService.createPollFromAny(question, choices_strs);
            
            PollService.thePoll = newPoll; // For demonstration purposes TODO: Remove
            console.log("The new poll:", newPoll)
            
            res.status(201).send(newPoll);

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

