
import { Sequelize } from 'sequelize-typescript';
import { Poll } from '../models/poll.model';
import { Comment } from '../models/comment.model'
import { TextChoice } from '../models/choice.model';
import { createPollService, PollService } from './pollservice';
import { sequelize } from '../models/db';  // Use this instead od mockedSequelize if testing against prod data

describe('Poll Service Integration', () => {
  let mockedSequelize: Sequelize;
  
  beforeAll(async () => {
    mockedSequelize = new Sequelize({
      database: "testingDB",
      username: "root",
      password: "",
      dialect: 'sqlite',
  
      models: [Poll, TextChoice, Comment]
  });
      await mockedSequelize.sync({ force: true });
  })

  afterAll(async () => {
      jest.clearAllMocks();
      await mockedSequelize.close();
  })

  describe('Poll management', () => {
    const pollService = createPollService();
    jest.spyOn(Poll, "count");

    const newPoll = {
        question: 'TestPollQuestion',
        choices: [
          "choice1",
          "choice2",
          "chocolate",
          "choice4",
          "bananas"
        ]
    }
    test("Create a poll", async () => {
    const createdPoll = await pollService.createPoll(newPoll.question, newPoll.choices)
    console.log("BB: " + createdPoll)
      
    expect(createdPoll).toBeInstanceOf(Poll);
    expect(createdPoll.question).toEqual(newPoll.question)
    expect(createdPoll.choices.length).toEqual(newPoll.choices.length)
    })

    test("Get created poll", async () => {
      const gottenPoll = await pollService.getPoll(1); // First poll will always have ID 1
            
      expect(gottenPoll).toBeInstanceOf(Poll);
      expect(gottenPoll.question).toEqual(newPoll.question);
      expect(gottenPoll.choices.length).toEqual(newPoll.choices.length);
    })

    test("Edit created poll", async () => {
      const gottenPoll = await pollService.editPoll(1, "NewQuestion", ["NewChoice1", "NewChoice2", "NewChoice3"])
      expect(gottenPoll).toBeInstanceOf(Poll);
      expect(gottenPoll.id).toEqual(1);
      expect(gottenPoll.question).toEqual("NewQuestion");
      expect(gottenPoll.choices.length).toEqual(3);
    })

    test("Increment created poll choices", async () => {

      
      let gottenPoll = await pollService.getPoll(1); // First poll will always have ID 1
      // An array of random votes to assign to each, 0-15
      const votes = Array.from({length: gottenPoll.choices.length}, () => Math.floor(Math.random() * 15));
      console.log(gottenPoll.choices)
      for (const [index, choice] of gottenPoll.choices.entries()) {
        for (let i=1; i <= votes[index]; i++)
        {
          await pollService.incrementCount(gottenPoll.id, choice.id);
        }
      }
      gottenPoll = await pollService.getPoll(1); // First poll will always have ID 1

      // Check that the sorted votes equals the amount and order of the votes in gottenPoll
      expect(votes.sort(function(a, b) {
        return a - b;
      }).reverse()).toEqual(gottenPoll.choices.map((c) => {return c.votes}))
    })
});
});