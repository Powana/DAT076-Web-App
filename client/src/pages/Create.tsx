import React, { useEffect, useRef, useState } from 'react';
import './Create.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Toast from 'react-bootstrap/Toast';
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

function Create() {
  const [numChoices, setNumChoices] = useState<number>(3);
  const questionInput = useRef<HTMLInputElement>(null);
  const choicesInput = Array(numChoices).fill(useRef<HTMLInputElement>(null));
  
  function handlePlus() {
    setNumChoices(numChoices => numChoices + 1);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    /* Create a json object here:
      {question:<q>, choices: [<cs>]}
      and POST it, instead of using the default submit behaviour 
    */
    e.preventDefault();
    
    if (questionInput?.current?.value == "" || choicesInput.some((choiceRef) => {return choiceRef?.current?.value == ""})) {
      alert("All fields are not filled in.");
      return;
    }

    let newPoll = {
      question: questionInput?.current?.value||"Nothing",
      choices: choicesInput.reverse().map((choice) => {return choice?.current?.value})  //Reverse as elements are listed from bottom up, then get the value
    }
    alert(newPoll.question)
    alert(newPoll.choices[0])
    // Send the JSON object to the backend via POST
    fetch("/poll", {
      method: "POST",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPoll)
    });
  }
  
  return (
    <div className="Create">
    <h2> Create a poll </h2>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Question</FormLabel>
          <FormControl type="text" ref={questionInput} required />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Choices:</FormLabel>
          {[...Array(numChoices)].map((_, i) => {
              return (
              <FormGroup>
                <FormLabel>Choice</FormLabel>
                <FormControl name={i.toString()} type="text" ref={choicesInput[i]} required /> 
              </FormGroup>
              )
            })}
        </FormGroup>
        <Button onClick={handlePlus}>+</Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  ) 
};

export default Create;
