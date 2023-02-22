import { IChoice, TextChoice } from "../model/choice";
import { Poll } from "../model/poll";


// Having an interface doesn't really make sense as we're only ever going to create one PollService
// Would make more sense to create a 'Poll' interface as we could have different implementations of Polls
interface IPollService {
    // Returns the poll
    getPoll() : Poll;

    //getPolls() : Array<Poll>;

    // Creates a poll
    createPoll(id:number,question : string, choices : Array<string>) : Poll;

    //add comment
    addcomment(id:number,comment:string):boolean;

    //extendable answer
    add_answer(id:number,answer:string):Poll;

    //select poll by id
    chosepoll(id:number):Poll;
}

export class PollService implements IPollService {
    static polls: null;

    static thePoll : Poll;

    polls : Array<Poll> = [];

    getPoll(): Poll {
        return PollService.thePoll;  // For demonstration purposes, limit to one poll at a time
    }
    
    chosepoll(id:number):Poll{
        return this.polls[id]
    }


    addcomment(id:number,comment: string): boolean {
        let actualPoll:Poll;
        actualPoll=this.chosepoll(id);
        actualPoll.comments.push(comment);
        return true;
    }

    //add 1 answer to the structure
    add_answer(id:number,answer:string):Poll{
        let poll:Poll;
        poll=this.chosepoll(id);
        poll.choices.push(new TextChoice(answer));
        return poll;
    }

    createPoll(id:number,question: string, choices: Array<string>): Poll {
        const poll = new Poll(id,question, choices);
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


        const poll = new Poll(0,question, choices);
        this.polls.push(poll)
        return poll;
    }

}