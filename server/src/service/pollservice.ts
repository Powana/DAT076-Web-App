import { IChoice, TextChoice } from "../models/choice.model";
import { Poll } from "../models/poll.model";


// Having an interface doesn't really make sense as we're only ever going to create one PollService
// Would make more sense to create a 'Poll' interface as we could have different implementations of Polls
interface IPollService {
    // Returns the poll
    getPoll() : Promise<Poll>;

    // Creates a poll
    createPoll(question : string, choices : Array<IChoice>) : Promise<Poll>;

    // Increments a choice in the poll
    // incrementCount(choice : number) : Promise<boolean>;
}

export class PollService implements IPollService {

    async getPoll(): Promise<Poll> {
        let foundPoll = await Poll.findOne();  // For demonstration purposes, limit to one poll at a time, simply select the first poll found
        if (foundPoll === null) {
            return Promise.reject("No poll found.")
        }
        return foundPoll;
    }
    // TODO
    //async incrementCount(choice: TextChoice): Promise<boolean> {
    //    
    //}

    async createPoll(question: string, choices: Array<IChoice>): Promise<Poll> {
        const poll = new Poll({question, choices});
        poll.save();
        return poll;
    }
    
    async createPollFromAny(question: string, choices: any[]): Promise<Poll> {
        let parsed_choices = new Array<IChoice>();
        const poll = new Poll({question: question});
        // const pollId = poll.$get("id");
        choices.forEach(choice => {
            switch (typeof(choice)){
                case "string": {
                    parsed_choices.push(poll.$create("choice", {text: choice }));// .then((tc: TextChoice) => {tc.}));  // Create a new TextChoice, save it, and pass it to the list
                    // parsed_choices.push(new TextChoice({text: choice, pollId: pollId}).save());// .then((tc: TextChoice) => {tc.}));  // Create a new TextChoice, save it, and pass it to the list
                    break;
                }
                default: {
                    throw Error("Invalid choice type")
                }
            }
        });
        poll.save();
        return poll;
    }
}