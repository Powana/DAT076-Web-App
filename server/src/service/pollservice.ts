import { IChoice, TextChoice } from "../model/choice";
import { Poll } from "../model/poll";


// Having an interface doesn't really make sense as we're only ever going to create one PollService
// Would make more sense to create a 'Poll' interface as we could have different implementations of Polls
interface IPollService {
    // Returns the poll
    getPoll() : Poll;

    // Creates a poll
    createPoll(id:number,question : string, choices : Array<IChoice>) : Poll;

    // Increments a choice in the poll
    incrementCount(id:number,choice : number) : boolean;

    //add comment
    addcomment(id:number,comment:string):boolean;

    add_answer(id:number,answer:string):Poll;
}

export class PollService implements IPollService {

    static thePoll : Poll;

    polls : Array<Poll> = [];

    getPoll(): Poll {
        return PollService.thePoll;  // For demonstration purposes, limit to one poll at a time
    }
    incrementCount(id:number,choice: IChoice): boolean {
        let idd=0
        for (let i=0;i<this.polls.length;i++){
            if (this.polls[i].id==id){
                idd=i
            }
        }
        const poll=this.polls[idd]
        return PollService.thePoll.incrementCount(choice);
    }

    addcomment(id:number,comment: string): boolean {
        if (comment==null){
            return false;
        }
        PollService.thePoll.comments.push(comment);
        return true;
    }

    createPoll(id:number,question: string, choices: Array<IChoice>): Poll {
        const poll = new Poll(id,question, choices);
        this.polls.push(poll)
        return poll;
    }
    
    createPollFromAny(id:number,question: string, choices: any[]): Poll {
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


        const poll = new Poll(id,question, choices);
        this.polls.push(poll)
        return poll;
    }



    //i do not know how to add 1 answer to map structure
    add_answer(id:number,answer:string):Poll{
        let oldchoices=PollService.thePoll.choices.keys;
        let newchoices=oldchoices.push(new TextChoice(answer));
        let newpoll=new Poll(id,PollService.thePoll.question, newchoices);


        return newpoll;
    }
}