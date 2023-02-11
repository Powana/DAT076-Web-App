import { IChoice, TextChoice } from "./choice";

    export class Poll {
        id:number;
        question : string;
        choices :  IChoice[];
        comments:string[];

        constructor(id:number,question: string, choices: Array<string>) {
            this.id=id;
            this.question = question;
            let lista:Array<IChoice>=[];
            choices.forEach(function (value) {
                lista.push(new TextChoice(value))
              });
            this.choices = lista;
            this.comments=[]; //you can not add comments when you create the poll
        }

        public toJSON() {
            return {
                id:this.id,question: this.question, choices: this.choices,comments:this.comments
            }
        }

        //simple choice
        public incrementCount(choice : string) :boolean{
            let x:boolean=false;
            this.choices.forEach(function (value) {
                if (choice==value.toString()){
                    value.incrementCount();
                    x= true;
                }
                });
                return x;

        }
        //multiple choices
        public incrementCounts(answers : Array<string>) :boolean{
            let x:boolean=false;
            for (let i=0;i<answers.length;i++){
                this.choices.forEach(function (value) {
                    if (answers[i]==value.toString()){
                        value.incrementCount();
                        x= true;
                    }
                    });
            }
            
                return x;

        }
    }