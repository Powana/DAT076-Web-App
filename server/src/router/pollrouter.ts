import express, { Request, Response } from "express";
import { PollService } from "../service/pollservice";
import { Poll } from "../models/poll.model";
import { IChoice, TextChoice } from "../models/choice.model";
import { config } from "../config";

export const pollRouter = express.Router();
const pollService = new PollService();

pollRouter.route("/")
    // GET /poll/ Main page TODO: Move logic out of router
    .get(async (req : Request, res : Response) => {
        try {
            if (config.FAKE_DB) {
                res.status(200).send({question: "Apples?", choices: ["Yes", "No", "Maybe"]})
                console.log("get")
                return;
            }

            await pollService.getPoll().then(
                (foundPoll) => {  // At the moment, only allow for one poll for simple testing purposes.
                    // Debug for testing purposes
                    foundPoll.$get("choices").then((foundPollChoices) => {
                        for (let c of foundPollChoices) {
                            console.log(c);
                        }
                    })
                    console.log("CCC");
                    res.status(200).send(foundPoll)// This is an example payload, containing only simple text, TODO: Find a better way to return this
                }, () => {
                    res.status(200).send("No poll has been created");
                })
            
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
    // POST /poll/ Create a new poll, Payload format {"question": <question: str>, "choices": [<array of choice str>]}
    .post(async (req : Request<{}, {}, {question: string, choices: Array<any>}>, res) => {
        try {
            const question: string = req.body["question"]
            const raw_choices: Array<string> = req.body["choices"] 
            
            if (question == null || raw_choices == null) {
                res.status(400).send("Invalid payload")
            }
            else if (raw_choices.length != 3) {  // For demonstration purposes TODO: Remove
                res.status(400).send("Polls must have 3 choices")
            }
            else {
                await pollService.createPollFromAny(question, raw_choices).then(
                    (newPoll) => {  // If a new poll was succesfully created:
                        res.status(201).send(newPoll);
                    }, (error) => { // If a new poll was not created:
                        res.status(400).send("Poll was not created, error: " + error)
                });
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
    // TODO: Will probably not work, can't pass IChoices via JSON right?
    .put(async (req: Request<{}, {}, {choice: IChoice}>, res) => {
        try {
            const choice: IChoice = req.body["choice"]
            
            if (choice == null) {
                res.status(400).send("Invalid payload")
            }
            
            // TODO res.status(200).send(await pollService.incrementCount(choice));

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

