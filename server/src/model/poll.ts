import { Choice } from "./choice";

export class Poll {
    question : string;
    choices : Array<Choice>;

    constructor(question: string, choices: Array<Choice>) {
        this.question = question;
        this.choices = choices;
    }
}