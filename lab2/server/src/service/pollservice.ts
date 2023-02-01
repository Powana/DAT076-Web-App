import { IChoice, TextChoice } from "../model/choice";
import { Poll } from "../model/poll";


// Having an interface doesn't really make sense as we're only ever going to create one PollService
// Would make more sense to create a 'Poll' interface as we could have different implementations of Polls
interface IPollService {
    // Returns the poll
    getPoll() : Poll;

    // Creates a poll
    createPoll(question : string, choices : Array<IChoice>) : Poll;

    // Increments a choice in the poll
    incrementCount(choice : number) : boolean;
}

export class PollService implements IPollService {

    static thePoll : Poll;

    polls : Array<Poll> = [];

    getPoll(): Poll {
        return PollService.thePoll;  // For demonstration purposes, limit to one poll at a time
    }
    incrementCount(choice: IChoice): boolean {
        return PollService.thePoll.incrementCount(choice);
    }

    createPoll(question: string, choices: Array<IChoice>): Poll {
        const poll = new Poll(question, choices);
        this.polls.push(poll)
        return poll;
    }
    
    createPollFromAny(question: string, choices: any[]): Poll {
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