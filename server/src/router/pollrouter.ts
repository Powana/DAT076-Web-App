import express, { Request, Response } from "express";
import { createPollService, IPollService} from "../service/pollservice";
import { Poll } from "../models/poll.model";
import { IChoice, TextChoice } from "../models/choice.model";
import { config } from "../config";

export const pollRouter = express.Router();
const pollService: IPollService = createPollService()

pollRouter.route("/")
    // GET /poll/ Main page TODO: Move logic out of router
    .get(async (req : Request, res : Response) => {
        try {
            if (config.FAKE_DB) {
                res.status(200).send({question: "Apples?", choices: ["Yes", "No", "Maybe"]})
                console.log("get")
                return;
            }

            await pollService.getAllPolls().then(
                (foundPolls) => {
                    res.status(200).send(foundPolls)
                }, () => {
                    res.status(400).send("No poll has been created");
                })
            
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
    // POST /poll/ Create a new poll, Payload format {"question": <question: str>, "choices": [<array of choice str>]}
    .post(async (req : Request<{}, {}, {question: string, choices: Array<string>}>, res) => {
        try {
            const question: string = req.body["question"];
            const raw_choices: Array<string> = req.body["choices"];

            if (question == null || raw_choices == null) {
                res.status(400).send("Invalid payload")
            }
            else {
                await pollService.createPoll(question, raw_choices).then(
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
    
    .put(async (req: Request<{}, {}, {pollID: number, choice: number}>, res) => {
        try {
            const pollID = req.body.pollID
            const choice = req.body.choice
            
            if (choice == null) {
                res.status(400).send("Invalid payload")
            }
            
            res.status(201).send(await pollService.incrementCount(pollID, choice));

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

pollRouter.route("/:id")

    .get(async (req : Request, res : Response) => {
        try {
            console.log("The params id is: ", parseInt(req.params.id))
            
            await pollService.getPoll(parseInt(req.params.id)).then(
                (foundPoll) => {
                    res.status(200).send(foundPoll)
                }, () => {
                    res.status(400).send("No poll has been created");
                })
            
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
    
    .put(async (req : Request<{id: string}, {}, {question: string, choices: Array<TextChoice>}>, res) => {
        try {
            
            await pollService.editPoll(parseInt(req.params.id), req.body.question, req.body.choices).then(
                (foundPoll) => {
                    res.status(200).send(foundPoll)
                }, () => {
                    res.status(400).send("Poll was not updated");
                })
            
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    .post(async (req : Request<{id: string}, {}, {name: string, text: string}>, res) => {
        try {

            await pollService.addComment(parseInt(req.params.id), req.body.name, req.body.text).then(
                (foundPoll) => {
                    res.status(200).send(foundPoll)
                }, () => {
                    res.status(400).send("Comment was not added");
                })
            
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
