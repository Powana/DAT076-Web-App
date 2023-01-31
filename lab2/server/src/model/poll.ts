    import { Choice } from "./choice";

    export class Poll {
        question : string;
        choices :  Map<Choice, number>;

        constructor(question: string, choices: Array<Choice>) {
            this.question = question;
            this.choices = new Map<Choice, number>();

            choices.forEach(choice => {
                this.choices.set(choice, 0);
            });
        }
    }