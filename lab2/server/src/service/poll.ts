import { Choice } from "../model/choice";
import { Poll } from "../model/poll";

export interface IPollService {
    // Returns the poll
    getPoll() : Promise<Array<Poll>>;

    // Creates a poll
    createPoll(question : string, choices : Array<Choice>) : Promise<Poll>

    // Increments a choice in the poll
    incrementCount(choice : number) : Promise<boolean>
}

class PollService implements IPollService {

    polls : Array<Poll> = [];

    getPoll(): Promise<Array<Poll>> {
       return this.polls;
    }
    incrementCount(choice: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async createPoll(question: string, choices: Choice[]): Promise<Poll> {
        
        const poll = new Poll(question, choices);
        this.polls.push(poll)
        return poll;
    }
}