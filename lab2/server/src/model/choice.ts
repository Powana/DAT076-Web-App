export interface IChoice {
    toString(): string;
}


export class TextChoice implements IChoice {
    text : string;

    constructor(text: string) {
        this.text = text;
    }

    public toString = () : string => {
        return this.text;
    }
    
}

// Example of another type of choice we could have
export class DateChoice implements IChoice {
    date : Date;

    constructor(date : Date) {
        this.date = date;
    }

    public toString = () : string => {
        return this.date.toLocaleDateString();
    }
    
}