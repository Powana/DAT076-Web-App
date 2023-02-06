import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { TextChoice } from "./choice.model";

@Table
export class Poll extends Model {
  @Column
  question!: string;

  // Define one-to-many relationship between Poll and Choice
  // TODO: How to have a db that can have multiple choice types?
  // Maybe just have them all be text and then have a struct/string that defines how to treat the text
  @HasMany(() => TextChoice)  
  choices!: TextChoice[];

  public incrementCount(choice : TextChoice) {
    // TODO
}
}