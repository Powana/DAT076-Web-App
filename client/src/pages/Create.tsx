import React, { useRef, useState, createRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

function Create({editMode = false, ...restProps}) {
  
  const [question, setQuestion] = useState<string>();
  const [choices, setChoices] = useState<string[]>(["","",""]);
  const [numChoices, setNumChoices] = useState<number>(3);
  const navigate = useNavigate();
  const { id } = useParams();


  const questionInputRef = useRef<HTMLInputElement>(null);
  let choicesInputRefs = new Array(); 
  for (let i = 0; i < numChoices; i++) {
    choicesInputRefs.push(createRef<HTMLInputElement>())
  }
  useEffect(() => {
      if (editMode) {
        axios.get("http://localhost:8080/poll/" + id).then((response) => {
            setQuestion(response.data.question);
            setNumChoices(response.data.choices.length);
            setChoices(response.data.choices.map((choice: {text: string}) => {
              return choice.text;
            }))
        });
        
      }
  }, []);
  
  function getChoice(index: number) {
    if (!choices || index >= choices.length) return ""
    return choices[index]
  }

  function setChoice(index: number, value: string) {
    if (choices) {
      let newChoices = [...choices]; 
      newChoices[index] = value;
      setChoices(newChoices);
    }
  }

  function addChoice() {
    if (numChoices<10){
      setNumChoices(numChoices => numChoices + 1);
      setChoices([...choices!, ""])
    }
  };

  function subtractChoice() {
    if (numChoices>2){
      setNumChoices(numChoices => numChoices - 1);
      setChoices(choices?.slice(0, -1))
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
      if (editMode) {
        const res = await axios.put("http://localhost:8080/poll/" + id, 
          {
            "question": newPoll.question, 
            "choices": newPoll.choices
          });
        navigate("/vote/" + res.data.id);
      }
      else {
        const res = await axios.post("http://localhost:8080/poll", 
          {
            "question": newPoll.question, 
            "choices": newPoll.choices
          });
        navigate("/vote/" + res.data.id);
      }
    } catch(error) {
      console.log(error)
    }
  }

  
  return (
    <div className="Create">
    <h2> Create a poll </h2>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <FormGroup key="questionKey">
          <FormLabel>Question</FormLabel>
          <FormControl type="text" value={question} ref={questionInputRef} required onChange={(e) => setQuestion(e.target.value)} data-testid="questionInput"/>
        </FormGroup>
        
        <FormGroup key="choicesKey">
          <FormLabel>Choices:</FormLabel>
          {[...Array(numChoices)].map((_, i) => {
              return (
              <FormGroup key={i}>
                <FormLabel>Choice</FormLabel>
                <FormControl name={i.toString()} type="text" value={getChoice(i)} ref={choicesInputRefs[i]} required  onChange={(e) => setChoice(i, e.target.value)} data-testid="choiceInput"/> 
              </FormGroup>
              )
            })}
        </FormGroup>
        <Button className="m-1" onClick={subtractChoice} data-testid="subChoice">-</Button>
        <Button className="m-1" onClick={addChoice} data-testid="addChoice">+</Button>
        <div className='submit-button'>
          <Button className="mt-3 m-1" variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  )
};

export default Create;
