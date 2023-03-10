import { IChoice, TextChoice } from "../models/choice.model";
import { Poll } from "../models/poll.model";
import { Comment } from "../models/comment.model"

// Having an interface doesn't really make sense as we're only ever going to create one PollService
// Would make more sense to create a 'Poll' interface as we could have different implementations of Polls
export interface IPollService {
    // Returns the poll
    getPoll(pollID: number) : Promise<Poll>;

    // Creates a poll
    createPoll(question : string, choices : Array<any>) : Promise<Poll>;

    // Increments a choice in the poll
    incrementCount(pollID : number, choiceID : number) : Promise<boolean>;

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
        const comment = new Comment({pollId: poll.id, name: name, text: text})
        comment.save()
        return true;
    }

    async editPoll(pollID: number, question: string, choices: Array<TextChoice>): Promise<Poll> {
        const poll = await Poll.findOne({where: {id: pollID}, include: [TextChoice]});
        if (!poll) return Promise.reject("No poll found");
        // Update question
        poll.question = question;
        poll.save()

        // Because the amount of choices can vary, don't bother updating the existing ones, just recreate them all.
        await TextChoice.destroy({where: {pollId: pollID}});

        for (const choice of choices) {
            new TextChoice({text: choice, pollId: poll.id}).save();
        };

        return this.getPoll(poll.id);        
    }

    async incrementCount(pollID: number, choiceID: number): Promise<boolean> {

        // Searches the choices for the correct pollID and choice id
        // Then incrementing value in database
        try {
            const ch = await TextChoice.findOne({where: {pollId: pollID, id: choiceID}})
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
        foundPoll.comments.sort((a: Comment, b: Comment) => b.createdAt - a.createdAt)
        return foundPoll;
    }
    
    async createPoll(question: string, choices: any[]): Promise<Poll> {
        const poll = await new Poll({question: question}).save();
        
        // Can easily add other types of choices in future versions
        for (const choice of choices) {
            switch (typeof(choice)){
                case "string": {
                    console.log("SERVICELAYER: " + choice)
                    await new TextChoice({text: choice, pollId: poll.id}).save();
                    break;
                }
                default: {
                    throw Error("Invalid choice type")
                }
            }
        }
        console.log("SERVICEBB: " + poll.choices)
        return this.getPoll(poll.id);
    }

    async getAllPolls(): Promise<Poll[]> {
        let foundPoll = await Poll.findAll({include: [TextChoice, Comment]}); 
        if (foundPoll === null) {
            return Promise.reject("No poll found.")
        }
        return foundPoll;
    }
}

export function createPollService(): IPollService {
    return new PollService()
}