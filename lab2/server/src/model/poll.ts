    import { IChoice } from "./choice";

    export class Poll {
        question : string;
        choices :  Map<IChoice, number>;

        constructor(question: string, choices: Array<IChoice>) {
            this.question = question;
            this.choices = new Map<IChoice, number>();

            choices.forEach(choice => {
                this.choices.set(choice, 0);
            });
        }
    }