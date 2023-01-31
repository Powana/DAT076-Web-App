export class Choice {
    text : string;
    count: number;

    constructor(text: string) {
        this.text = text;
        this.count = 0;
    }

    incrementCount() {
        this.count += 1;
    }

    
}