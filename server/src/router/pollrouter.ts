import express, { Request, Response } from "express";
import { PollService } from "../service/pollservice";
import { Poll } from "../model/poll";
import { IChoice, TextChoice } from "../model/choice";

export const pollRouter = express.Router();
const pollService = new PollService();

pollRouter.route("/")
    .get(async (req : Request, res : Response) => {
        try {
            if ((await pollService.getPoll()) == null) {  // At the moment, only allow for one poll for simple testing purposes.
                res.status(200).send("No poll has been created");

            }
            else {
                res.status(200).send(await pollService.getPoll())
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
    .post(async (req : Request<{}, {}, {question: string, choices: Array<any>}>, res) => {
        try {
            const question: string = req.body["question"]
            const raw_choices: Array<string> = req.body["choices"] 
            
            if (question == null || raw_choices == null) {
                res.status(400).send("Invalid payload")
            }
            
            if (raw_choices.length != 3) {  // For demonstration purposes TODO: Remove
                res.status(400).send("Polls must have 3 choices")
            }

            let newPoll = await pollService.createPollFromAny(question, raw_choices);
            
            
            res.status(201).send(newPoll.toJSON());

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
    .put(async (req: Request<{}, {}, {choice: IChoice}>, res) => {
        try {
            const choice: IChoice = req.body["choice"]
            
            if (choice == null) {
                res.status(400).send("Invalid payload")
            }
            
            res.status(200).send(await pollService.incrementCount(choice));

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

