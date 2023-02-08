import express, { Request, Response } from "express";
import { PollService } from "../service/pollservice";
import { Poll } from "../model/poll";
import { IChoice, TextChoice } from "../model/choice";

export const pollRouter = express.Router();
const pollService = new PollService();

pollRouter
    .get('/',(req : Request, res : Response) => {
        try {
            if (PollService.thePoll == null) {  // At the moment, only allow for one poll for simple testing purposes.
                res.status(200).send("No poll has been created");

            }
            else {
                res.status(200).send(PollService.thePoll)
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    //crear poll
    .post('/',(req : Request<{}, {}, {id:number,question: string, choices: Array<any>}>, res) => {
        try {
            const id: number = req.body["id"]
            const question: string = req.body["question"]
            const raw_choices: Array<string> = req.body["choices"] 
            
            if (question == null || raw_choices == null) {
                res.status(400).send("Invalid payload")
            }
            
            if (raw_choices.length != 3) {  // For demonstration purposes TODO: Remove
                res.status(400).send("Polls must have 3 choices")
            }

            let newPoll = pollService.createPollFromAny(id,question, raw_choices);
            
            PollService.thePoll = newPoll; // For demonstration purposes TODO: Remove
            
            res.status(201).send(newPoll.toJSON());

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    //responder poll
    .put('/answer',(req: Request<{}, {}, {id:number,choice: IChoice}>, res) => {
        try {
            const id: number = req.body["id"]
            const choice: IChoice = req.body["choice"]
            
            if (choice == null) {
                res.status(400).send("Invalid payload")
            }
            
            res.status(200).send(pollService.incrementCount(id,choice));

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    //añadir comentario
    .put('/comment',(req:Request<{},{},{id:number,comment:string}>,res)=>{
        try {
            const id: number = req.body["id"]
            const comment: string = req.body["comment"]
            
            if (comment == null) {
                res.status(400).send("Invalid payload")
            }
            
            res.status(200).send(pollService.addcomment(id,comment));

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
