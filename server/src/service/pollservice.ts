import { IChoice, TextChoice } from "../models/choice.model";
import { Poll } from "../models/poll.model";
import { Comment } from "../models/comment.model"

// Having an interface doesn't really make sense as we're only ever going to create one PollService
// Would make more sense to create a 'Poll' interface as we could have different implementations of Polls
interface IPollService {
    // Returns the poll
    getPoll(pollID: number) : Promise<Poll>;

    // Creates a poll
    createPoll(question : string, choices : Array<IChoice>) : Promise<Poll>;

    // Increments a choice in the poll
    incrementCount(pollID : number, choice : number) : Promise<boolean>;

    // Returns all polls
    getAllPolls() : Promise<Poll[]>

    // Update values in a poll
    editPoll(pollID: number, question : string, choices : Array<IChoice>) : Promise<Poll>;

    addComment(pollID: number, name: string, text: string) : Promise<boolean>
}

export class PollService implements IPollService {

    async addComment(pollID: number, name: string, text: string): Promise<boolean> {
        const poll = await Poll.findOne({where: {id: pollID}, include: [Comment]});
        if (!poll) return Promise.reject("No poll found");
        const comment = new Comment({name, text})
        comment.pollId = pollID;
        comment.save()
        poll.comments.push(comment)
        poll.save();
        return true;
    }

    async editPoll(pollID: number, question: string, choices: Array<TextChoice>): Promise<Poll> {

        const poll = await Poll.findOne({where: {id: pollID}, include: [TextChoice]});
        if (!poll) return Promise.reject("No poll found");
        // Update question
        poll.question = question;
        poll.save()

        choices.forEach(choice => {
            TextChoice.update({text: choice.text}, {where: {pollId: pollID, id: choice.id}})
        });

        return poll;
        
    }

    async incrementCount(pollID: number, choice: number): Promise<boolean> {

        // Searches the choices for the correct pollID and choice id
        // Then incrementing value in database
        try {
            const ch = await TextChoice.findOne({where: {pollId: pollID, id: choice}})
            await ch?.increment({votes: +1})
        } catch (error) {
            return Promise.reject(false);
        }
        
        
        return true;
    }

    async getPoll(pollID: number): Promise<Poll> {

        const foundPoll = await Poll.findOne({
            where: {id: pollID}, include: [TextChoice, Comment]
        });
        
        if (foundPoll === null) {
            return Promise.reject("No poll found.")
        }

        foundPoll.choices.sort((a: TextChoice, b: TextChoice) => b.votes - a.votes)
        return foundPoll;
    }
    
    
    async createPoll(question: string, choices: Array<IChoice>): Promise<Poll> {
        const poll = new Poll({question, choices});
        poll.save();
        return poll;
    }
    
    async createPollFromAny(question: string, choices: any[]): Promise<Poll> {
        const poll = await new Poll({question: question}).save();
        
        choices.forEach(choice => {
            switch (typeof(choice)){
                case "string": {
                    new TextChoice({text: choice, pollId: poll.id}).save();
                    break;
                }
                default: {
                    throw Error("Invalid choice type")
                }
            }
        });
        return poll;
    }

    async getAllPolls(): Promise<Poll[]> {
        let foundPoll = await Poll.findAll({include: [TextChoice]}); 
        if (foundPoll === null) {
            return Promise.reject("No poll found.")
        }
        return foundPoll;
    }
}