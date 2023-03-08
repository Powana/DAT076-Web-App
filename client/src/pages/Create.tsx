import React, { useRef, useState, createRef } from 'react';
import './Create.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

function Create() {
  const [numChoices, setNumChoices] = useState<number>(3);
  const navigate = useNavigate();

  const questionInputRef = useRef<HTMLInputElement>(null);
  let choicesInputRefs = new Array(); 
  for (let i = 0; i < numChoices; i++) {
    choicesInputRefs.push(createRef<HTMLInputElement>())
  }
  
  function addChoice() {
    if (numChoices<10){
    setNumChoices(numChoices => numChoices + 1);
    }
  };

  function subtractChoice() {
    if (numChoices>2){
    setNumChoices(numChoices => numChoices - 1);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    
    e.preventDefault();
    
    if (questionInputRef?.current?.value == "" || choicesInputRefs.some((choiceRef) => {return choiceRef?.current?.value == ""})) {
      alert("All fields are not filled in.");
      return;
    }

    let newPoll = {
      question: questionInputRef?.current?.value||"Nothing",
      choices: choicesInputRefs.map((choice) => {return choice?.current?.value})  //Reverse as elements are listed from bottom up, then get the value
    }
    
    try {
      let res = await axios.post("http://localhost:8080/poll", 
        {
          "question": newPoll.question, 
          "choices": newPoll.choices
        })
      navigate("/vote/" + res.data.id);
    } catch(error) {
      console.log(error)
    }
  }

  
  return (
    <div className="Create">
    <h2> Create a poll </h2>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Question</FormLabel>
          <FormControl type="text" ref={questionInputRef} required />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Choices:</FormLabel>
          {[...Array(numChoices)].map((_, i) => {
              return (
              <FormGroup>
                <FormLabel>Choice</FormLabel>
                <FormControl name={i.toString()} type="text" ref={choicesInputRefs[i]} required /> 
              </FormGroup>
              )
            })}
        </FormGroup>
        <Button onClick={subtractChoice}>-</Button>
        <Button onClick={addChoice}>+</Button>
        <div className='submit-button'>
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  )
};

export default Create;
