import { Choice } from "../model/choice";
import { Poll } from "../model/poll";

interface IPollService {
    // Returns the poll
    getPoll() : Poll;

    // Creates a poll
    createPoll(question : string, choices : Array<Choice>) : Promise<Poll>

    // Increments a choice in the poll
    incrementCount(choice : number) : Promise<boolean>
}

export class PollService implements IPollService {

    static thePoll : Poll;

    polls : Array<Poll> = [];

    getPoll(): Poll {
        return PollService.thePoll;
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