/**
* @jest-environment jsdom
*/

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { SingleChoiceList } from "./SingleChoiceList";


let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
function fakeSetChoice(id: number) {}

const fakeChoices = [
    {
        id: 0,
        text: "Choice #1",
        votes: 0
    },
    {
        id: 1,
        text: "Choice #2",
        votes: 222
    },
    {
        id: 2,
        text: "Choice #3",
        votes: 939
    },
    {
        id: 3,
        text: "Choice #4",
        votes: 42
    },
];

it("should render the text contents of choices correctly", () => {
    act(() => {
        render(<SingleChoiceList choices={fakeChoices} setChoice={fakeSetChoice}/>, container);
    });
    expect(container.textContent).toBe("Choice #1Choice #2Choice #3Choice #4");
})