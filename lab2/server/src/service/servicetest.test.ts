import {PollService} from "./pollservice"

test ("if a poll is made, it schould be retreavable from get poll", async() => {
let pollQ = "Question?";
const pollC = ["A", "B", "C"]
const testpollservice = new PollService();
testpollservice.createPollFromAny(pollQ, pollC);
const pollGotten = testpollservice.getPoll();

expect(pollGotten.question===pollQ).toBeTruthy();

});