import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Poll } from "./poll.model";

export interface IChoice {
    toString(): string;
}

@Table
export class TextChoice extends Model implements IChoice {
    @Column
    text!: string;

    @Column
    votes!: number;

    @ForeignKey(() => Poll)
    @Column
    pollId!: number;
  
    @BelongsTo(() => Poll)
    poll!: Poll;
}

@Table
export class DateChoice extends Model implements IChoice {
    @Column
    date!: Date;

    @Column
    votes!: number;

    // Define one-to-many relationship between Poll and Choice
    @ForeignKey(() => Poll)
    @Column
    pollId!: number;
  
    @BelongsTo(() => Poll)
    poll!: Poll;
}

