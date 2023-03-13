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
  ///
  let newchoicesInputRefs = new Array();
  const  old_length = choices?.length||0 ;
  const [numChoices, setNumChoices] = useState<number>(old_length);
  for (let i = old_length; i < numChoices; i++) {
    newchoicesInputRefs.push(createRef<HTMLInputElement>())
  }
  //
  
  for (let i = 0; i < old_length; i++) {
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
    if (numChoices<10){
    setNumChoices(numChoices => numChoices + 1);
    }
  };

  function subtractChoice() {
    if (numChoices>2){
    setNumChoices(numChoices => numChoices - 1);
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

  //////////////////////////////////////////////////////////////7
  async function handlechoices(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if ( newchoicesInputRefs.some((choiceRef) => {return choiceRef?.current?.value == ""})) {
      alert("All fields are not filled in.");
      return;
    }

    //only the new choices
    let newchoices=newchoicesInputRefs.map((choice) => {return choice?.current?.value});

    try {
      let res=await axios.post("http://localhost:8080/poll/newchoices/"+id, 
        {
          "choices": newchoices
        })
    } catch(error) {
      console.log(error)
    }

  }
///////////////////////////////////////////////////////////////////7

  return (
    <div className="Edit">
      <div className="id_vote">
        <p > ID : {id}  </p>
      </div>
      <br></br>
      <Form className="mb-3" onSubmit={submitEdit}>
        <FormGroup>
          <FormLabel column="lg">Question</FormLabel>
          <FormControl type="text" placeholder={question} onChange={(e) => setQuestion(e.target.value)}/>
        </FormGroup>
        
        <FormGroup>
          <FormLabel column="lg">Choices:</FormLabel>
          {[...Array(old_length)].map((_, i) => {
              return (
              <FormGroup key={i}>
                <FormLabel>Choice</FormLabel>
                {/* React requires on onChange function if value is set or it will be uneditable, use placeholder for now */}
                <FormControl type="text" placeholder={getChoice(i)} onChange={(e) => setChoice(i, e.target.value)} />
              </FormGroup>
              )
            })}
        </FormGroup>


        <Form className='mb-3' onSubmit={handlechoices}>
          <FormGroup key="choicesKey">
            <FormLabel column="lg">New choices:</FormLabel>
            {[...Array(numChoices)].map((_, i) => {
                return (
                <FormGroup key={i}>
                  <FormLabel>Choice</FormLabel>
                  <FormControl  type="text" name={i.toString()} ref={newchoicesInputRefs[i]} required data-testid="choiceInput"/> 
                </FormGroup>
                )
              })}
          </FormGroup>


        <Button onClick={subtractChoice} data-testid="subChoice">-</Button>
        <Button onClick={addChoice} data-testid="addChoice">+</Button>
        
        <div className='submit-button'>
           <Button variant="primary" type="submit">Save</Button>
        </div>

        </Form>
        <div className='submit-button'>
           <Button variant="primary" type="submit">Save</Button>
        </div>
        
        </Form>
        <a  className="exit_button" href="../redirect"><Button variant="outline-danger">Back to start page</Button ></a>     
    </div>
  );
}

export default Edit;
