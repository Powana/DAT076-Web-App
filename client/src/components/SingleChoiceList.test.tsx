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

let choiceId: number;
function fakeSetChoice(id: number) {
    choiceId = id;
}

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

test("functionality of selecting a choice", () => {
    const selectedId = Math.floor(Math.random() * fakeChoices.length);
    // Render the component first
    act(() => {
        render(<SingleChoiceList choices={fakeChoices} setChoice={fakeSetChoice}/>, container);
    });

    const choiceList = document.querySelector("[data-testid=SingleChoiceList]");
    expect(choiceList).toBeTruthy();

    if (choiceList == null) {  // Simple way to shut up typescript
        return;
    } 

    const choiceButtons = choiceList.querySelectorAll("[data-testid=SingleChoiceListButton]");
    expect(choiceButtons?.length === fakeChoices.length);

    let button: Element;
    let randomIdx: number;
    let chosenIdStr: string | null | undefined;
    let chosenId: number = -1;

    // Select a random button and click it a few times
    for (let i=0; i<10; i++) {
        randomIdx = Math.floor(Math.random() * fakeChoices.length)
        button = choiceButtons[randomIdx];
        expect(button)
        console.log("=")
        console.log(button.innerHTML)
        console.log("=")
        console.log(button.getElementsByTagName)
        // Get the actual input assoicated with the button, which contains the value attribute
        chosenIdStr = choiceList.querySelector("[id=" + button.getAttribute('for') +"]")?.getAttribute("value");
        expect(chosenIdStr).toBeTruthy();

        if (chosenIdStr == null) {
            chosenId = -1; // No choice will have ID -1
        }
        else {
            chosenId = +chosenIdStr;
        }        

        act(() => {
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

    }

    // Expect the global variable choiceId to have been set to the latest random Id;
    expect(choiceId == chosenId);
})