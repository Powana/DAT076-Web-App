import React, {useState, useEffect, createRef, useRef} from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Edit.css';

function Edit() {
  const [question, setQuestion] = useState<string>();
  const [choices, setChoices] = useState<any[]>();
  const { id } = useParams();
  const navigate = useNavigate();

  const questionInputRef = useRef<HTMLInputElement>(null);
  let choicesInputRefs = new Array();
  let length = choices?.length||0 
  for (let i = 0; i < length; i++) {
    choicesInputRefs.push(createRef<HTMLInputElement>())
  }


  function getChoice(index: number) {
    if (!choices) return ""
    return choices[index].text
  }

  function setChoice(index: number, value: string) {
    if (choices) {
      choices[index].text = value
    }
  }

  function addChoice() {
    if (length<10){
      length+=1;
      
    }
  };

  function subtractChoice() {
    if (length>2){
      length-=1;
    }
  };


  useEffect(() => {
    axios.get("http://localhost:8080/poll/" + id).then((response) => {
        setQuestion(response.data.question);
        setChoices(response.data.choices);
    });
  }, []);

  async function submitEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    await axios.put("http://localhost:8080/poll/"+ id, {"question": question, "choices": choices})
    navigate("/result/" + id);
  }

  return (
    <div className="Edit">
      <Form className="mb-3" onSubmit={submitEdit}>
        <FormGroup>
          <FormLabel column="lg">Question</FormLabel>
          <FormControl type="text" placeholder={question} onChange={(e) => setQuestion(e.target.value)}/>
        </FormGroup>
        
        <FormGroup>
          <FormLabel column="lg">Choices:</FormLabel>
          {[...Array(length)].map((_, i) => {
              return (
              <FormGroup key={i}>
                <FormLabel>Choice</FormLabel>
                {/* React requires on onChange function if value is set or it will be uneditable, use placeholder for now */}
                <FormControl type="text" placeholder={getChoice(i)} onChange={(e) => setChoice(i, e.target.value)} />
              </FormGroup>
              )
            })}
        </FormGroup>
      
        <Button onClick={subtractChoice} data-testid="subChoice">-</Button>
        <Button onClick={addChoice} data-testid="addChoice">+</Button>
        <div className='submit-button'>
           <Button variant="primary" type="submit">
          Save
        </Button>
        </div>
        
        </Form>
      
    </div>
  );
}

export default Edit;
