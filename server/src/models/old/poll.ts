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

        public toJSON() {
            return {question: this.question, choices: Object.fromEntries(this.choices)}
        }

        public incrementCount(choice : IChoice): boolean {
            let count = this.choices.get(choice);
            if (count == null) {
                return false;
            }
            count += 1;
            this.choices.set(choice, count)
            return true;
        }
    }