import {PollService} from "./pollservice"

test ("if a poll is made, it schould be retreavable from get poll", async() => {
const pollQ = "Question?";
const pollC = ["A", "B", "C"]
const testpollservice = new PollService();
await testpollservice.createPollFromAny(pollQ, pollC);
const pollGotten = await testpollservice.getPoll();

expect(pollGotten.question===pollQ).toBeTruthy();

});