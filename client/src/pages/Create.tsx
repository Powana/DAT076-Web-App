import React, { useEffect, useState } from 'react';
import './Create.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Toast from 'react-bootstrap/Toast';
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

function Create() {
  const [numChoices, setNumChoices] = useState<number>(3);
  
  function handlePlus() {
    setNumChoices(numChoices => numChoices + 1);
  };

  function handleSubmit(e: any) {
    e.preventDefault();    
    alert('You clicked submit.');
    /* Create a json object here:
      {question:<q>, choices: [<cs>]}
      and POST it, instead of using the default submit behaviour */
  }

  function Plus_answer() {
    return (
      <span className="Button">
        <Button onClick={handlePlus}>+</Button>{''}
      </span>
    );
  };

  
  return (
    <div className="Create">
    <h2> Create a poll </h2>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Question</FormLabel>
          <FormControl type="text" />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Choices:</FormLabel>
          {[...Array(numChoices)].map((_, i) => {
              return (
              <FormGroup>
                <FormLabel>Choice</FormLabel>
                <FormControl name={i.toString()} type="text"/> 
              </FormGroup>
              )
            })}
        </FormGroup>
        <Plus_answer />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
  /*

function Questionfield() {
  return (
    <div className="Questionbox">
      <h2> Create a question </h2>
        <label>Enter question</label>
        <input type="text" placeholder="Question" name="ques"></input>
    </div>
  );
}

function Choicefield(props: {idx: number}) {
  return (
    <div className="Choicebox">
      <form>
        <label>Enter answer</label>
        <input type="text" placeholder="Option" name={props.idx.toString()}></input>
      </form>
    </div>
  );
};


  
  return (
    <div className="Create">
      <Form className="mb-3">
        <FormGroup>
          <FormLabel>Question</FormLabel>
          <FormControl type="text" value={question} />
        </FormGroup>
            <div className="NewPoll">
              <Questionfield />
              <div className="choiceBox">
                <h2 >Possible answers </h2>
                <div>
                  {[...Array(numChoices)].map((_, i) =>
                    <Choicefield idx={i} />
                  )}
                </div>
              </div>
              <Plus_answer />
              <Button variant="primary" type="submit">Submit</Button>
            </div>
    </div>
  ) */
 
};

export default Create;
