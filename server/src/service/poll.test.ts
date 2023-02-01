import {PollService} from "./pollservice"

test ("if a poll is created, it schould be retrievable from get poll", async() => {
const pollQ = "Question?";
const pollC = ["A", "B", "C"]
const testpollservice = new PollService();
await testpollservice.createPoll(pollQ, pollC);
const pollGotten = await testpollservice.getPoll();
expect(pollGotten.question === pollQ).toBeTruthy();

});