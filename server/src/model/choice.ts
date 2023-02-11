export interface IChoice {
    incrementCount(): boolean;
    toString(): string;
}
export class TextChoice implements IChoice {
    text : string;
    count : number;
    
    constructor(text: string) {
        this.text = text;
        this.count=0;
    }

    public toString = () : string => {
        return this.text;
    }   

    public incrementCount=():boolean=>{
        this.count=this.count+1;
        return true;
    }

}
// Example of another type of choice we could have
export class DateChoice implements IChoice {
    date : Date;
    count:number;

    constructor(date : Date) {
        this.date = date;
        this.count=0;
    }

    public toString = () : string => {
        return this.date.toLocaleDateString();
    }
    public incrementCount=():boolean=>{
        this.count=this.count+1;
        return true;
    }
}