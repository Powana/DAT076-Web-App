/**
* @jest-environment jsdom
*/

import axios from "axios";

import userEvent from "@testing-library/user-event";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Create from "./Create";

// Setup
let container: any = null;
beforeEach(() => {
  // setup a JS-DOM element as a render target, so that we don't need to use a brwoser to render
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// Navigation not supported by jsdom, so mock it.
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

// We don't want to contact the backend, so mock post requests.
const mockedPost = jest.fn();  // Could potentially add a check for the payload here to avoid the error in the navigation in Create.tsx
jest.mock('axios');
axios.post = mockedPost;

// Input
const desiredQuestion = "Q?"
const desiredChoices = ["1","2","3","4","5","6","7","8","9","10"];


// Tests
test("Integration Use-case: Create a poll", () => {
    act(() => {
        render(<Create/>, container);
    })

    const submitButton = container.querySelector('[type=submit]')
    expect(submitButton).toBeTruthy();

    // Make sure the mocked post hasnt been called during render for some reason.
    expect(mockedPost).not.toHaveBeenCalled();

    const addButton = container.querySelector('[data-testid=addChoice]')
    expect(addButton).toBeTruthy();

    // Press the add button 20 times, should only result in 10 choice inputs
    for (let i=0; i <= 20; i++) {
        act(() => {
            addButton!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
    }

    // Get the question input element
    let questionInput = container.querySelector('[data-testid=questionInput]');
    expect(questionInput).toBeTruthy();

    // Fill in the question
    act(() => {
        userEvent.type(questionInput, desiredQuestion);
    });
    expect(questionInput.value).toBe(desiredQuestion);

    // There should be choice inputs, and there should be ten of them.
    let choiceInputs = container.querySelectorAll('[data-testid=choiceInput]');
    expect(choiceInputs).toBeTruthy()
    expect(choiceInputs.length === 10)

    // Fill in the choices
    for (let i=0; i < choiceInputs.length; i++) {
        act(() => {
            userEvent.type(choiceInputs[i], desiredChoices[i]);
        });
        expect(choiceInputs[i].value).toBe(desiredChoices[i]);
    }

    // Click the submit button
    act(() => {
        submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // The backend should have been posted
    expect(mockedPost).toHaveBeenCalled();

});