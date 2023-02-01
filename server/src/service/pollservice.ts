import { IChoice, TextChoice } from "../model/choice";
import { Poll } from "../model/poll";


// Having an interface doesn't really make sense as we're only ever going to create one PollService
// Would make more sense to create a 'Poll' interface as we could have different implementations of Polls
interface IPollService {
    // Returns the poll
    getPoll() : Promise<Poll>;

    // Creates a poll
    createPoll(question : string, choices : Array<IChoice>) : Promise<Poll>;

    // Increments a choice in the poll
    incrementCount(choice : number) : Promise<boolean>;
}

export class PollService implements IPollService {


    polls : Array<Poll> = [];

    async getPoll(): Promise<Poll> {
        return this.polls[0];  // For demonstration purposes, limit to one poll at a time
    }
    async incrementCount(choice: IChoice): Promise<boolean> {
        return this.polls[0].incrementCount(choice);
    }

    async createPoll(question: string, choices: Array<IChoice>): Promise<Poll> {
        const poll = new Poll(question, choices);
        this.polls.push(poll);
        return poll;
    }
    
    async createPollFromAny(question: string, choices: any[]): Promise<Poll> {
        let parsed_choices = new Array<IChoice>;

        choices.forEach(choice => {
            switch (typeof(choice)){
                case "string": {
                    parsed_choices.push(new TextChoice(choice));
                    break;
                }
                default: {
                    throw Error("Invalid choice type")
                }
            }
        });


        const poll = new Poll(question, choices);
        this.polls.push(poll)
        return poll;
    }
}