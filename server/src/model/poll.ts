import { IChoice } from "./choice";

    export class Poll {
        id:number;
        question : string;
        choices :  Map<IChoice, number>;
        comments:string[];

        constructor(id:number,question: string, choices: Array<IChoice>) {
            this.id=id;
            this.question = question;
            this.choices = new Map<IChoice, number>();
            this.comments=[]; //you can not add comments when you create the poll


            //el mapeado sirve para ver el numero de veces que ha sido votado
            choices.forEach(choice => {
                this.choices.set(choice, 0);
            });
        }

        public toJSON() {
            return {id:this.id,question: this.question, choices: Object.fromEntries(this.choices),comments:this.comments}
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