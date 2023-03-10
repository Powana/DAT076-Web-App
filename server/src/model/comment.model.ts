import { Table, Model, Column, ForeignKey, BelongsTo, Default, AllowNull } from "sequelize-typescript";
import { Poll } from "./poll.model";

@Table
export class Comment extends Model {
    @Column
    name!: string

    @Column
    text!: string

    @ForeignKey(() => Poll)
    @Column
    pollId!: number;
  
    @BelongsTo(() => Poll)
    poll!: Poll;
}