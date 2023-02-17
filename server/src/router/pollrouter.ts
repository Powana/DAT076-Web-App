import express, { Request, Response } from "express";
import { PollService } from "../service/pollservice";
import { Poll } from "../model/poll";
import { IChoice, TextChoice } from "../model/choice";

export const pollRouter = express.Router();
const pollService = new PollService();
let contador=0;

//http://localhost:PORT/poll/

pollRouter
    .get('/',(req : Request, res : Response) => {
        try {
            if (pollService.getPoll(0)==null) {  // At the moment, only allow for one poll for simple testing purposes.
                res.status(200).send("No poll has been created");

            }
            else {
                let newPoll = pollService.getPoll(0); //// At the moment, only allow for one poll for simple testing purposes.
                res.status(201).send(newPoll.toJSON());


            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    //crear first poll
    .post('/firstcreate',(req : Request<{}, {}, {question: string, choices: Array<any>}>, res) => {
        try {
            const question: string = req.body["question"]
            const raw_choices: Array<any> = req.body["choices"] 
            
            if (question == null || raw_choices == null) {
                res.status(400).send("Invalid payload")
            }
            
            if (raw_choices.length != 3) {  // For demonstration purposes TODO: Remove
                res.status(400).send("Polls must have 3 choices")
            }


            let parsed_choices = new Array<string>;

            raw_choices.forEach(choice => {
            switch (typeof(choice)){
                case "string": {
                    parsed_choices.push(choice);
                    break;
                }
                default: {
                    res.status(400).send("Polls must be strings")
                }   
            }
        });

            let newPoll = pollService.createPollFromAny(question, raw_choices);
            console.log(newPoll.toJSON());
            contador=contador+1;
            res.status(201).send(newPoll.toJSON());

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    
    //add answer
    .post('/addanswer',(req : Request<{}, {}, {id:number,choice: string}>, res) => {
        try {
            const id: number = req.body["id"]
            const answer: string = req.body["choice"]
            
            if (answer == null || id>=contador) {
                res.status(400).send("Invalid payload")
            }
            
            else{
                let newPoll = pollService.add_answer(id,answer);
            
                
                res.status(201).send(newPoll.toJSON());
            }
        

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    
    //answer poll with single answer
    .put('/answer',(req: Request<{}, {}, {id:number,choice: string}>, res) => {
        try {
            const id: number = req.body["id"]
            const choice: string = req.body["choice"]
            
            if (choice == null || id>=contador) {
                res.status(400).send("Invalid payload")
            }
            
            res.status(200).send(pollService.getPoll(id).incrementCount(choice));
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    
    //add comment
    .put('/comment',(req:Request<{},{},{id:number,comment:string}>,res)=>{
        try {
            const id: number = req.body["id"]
            const comment: string = req.body["comment"]
            
            if (comment == null || id>=contador) {
                res.status(400).send("Invalid payload")
            }
            
            res.status(200).send(pollService.addcomment(id,comment));

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    //obtain exact poll
    .put('/concretepoll',(req : Request<{}, {}, {id: number}>, res : Response) => {
        try {
            const id: number = req.body["id"]

            if (id>= contador) {  // At the moment, only allow for one poll for simple testing purposes.
                res.status(200).send("No poll has been created");

            }
            else {
                res.status(200).send(pollService.getPoll(id))
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    //get all polls
    .get('/allpolls',(req : Request, res : Response) => {
        try {
            const id: number = req.body["id"]

            if (pollService.polls == null) {  // At the moment, only allow for one poll for simple testing purposes.
                res.status(200).send("No poll has been created");

            }
            else {
                res.status(200).send(pollService.polls)
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    //crear others poll
    .post('/create',(req : Request<{}, {}, {question: string, choices: Array<string>}>, res) => {
        try {
            const question: string = req.body["question"]
            const raw_choices: Array<string> = req.body["choices"] 
            
            if (question == null || raw_choices == null) {
                res.status(400).send("Invalid payload")
            }
            
            if (raw_choices.length != 3) {  // For demonstration purposes TODO: Remove
                res.status(400).send("Polls must have 3 choices")
            }

            let newPoll = pollService.createPoll(contador,question, raw_choices);
            contador=contador+1;
            console.log(newPoll.toJSON());

            res.status(201).send(newPoll.toJSON());

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

   
    //answer poll with multiple answer
    .put('/multipleanswer',(req: Request<{}, {}, {id:number,choices: Array<string>}>, res) => {
        try {
            const id: number = req.body["id"]
            const choices:  Array<string> = req.body["choices"]
            
            if (choices == null || id>=contador) {
                res.status(400).send("Invalid payload")
            }
            
            res.status(200).send(pollService.getPoll(id).incrementCounts(choices));

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })
