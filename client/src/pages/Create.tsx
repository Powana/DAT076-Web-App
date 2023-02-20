import React, { useEffect, useState } from 'react';
import './Create.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

function Create() {
  const [numChoices, setNumChoices] = useState<number>(3);
  const navigate = useNavigate();
  
  function addChoice() {
    setNumChoices(numChoices => numChoices + 1);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();    
    
    /* Create a json object here:
      {question:<q>, choices: [<cs>]}
      and POST it, instead of using the default submit behaviour */
    const data = new FormData(e.target),
          dataObj = Object.fromEntries(data.entries())
    const question = dataObj.question;
    delete dataObj.question;
    const choices = Object.values(dataObj);
    const jsonPoll = {"question": question, "choices": choices}
    
    // formatted data is now sent to backend
    // use response to get id and redirect to correct poll
    try {
      let res = await axios.post("http://localhost:8080/poll", jsonPoll)
      navigate("/result/" + res.data.id);
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
          <FormControl name="question" type="text" />
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
        <Button onClick={addChoice}>+</Button>
        <div className='submit-button'>
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  )
};

export default Create;
