import React, {useEffect, useState} from 'react';
//import logo from './logo.png';
import './App.css';
import { Button,Form,FormCheck,FormControl,FormGroup,FormLabel} from 'react-bootstrap';
import axios from 'axios';
import CFormCheck from '@coreui/react'

//Components
import Comment from './components/comment';
import Answer from './components/answer';
// <img src={logo} className="App-logo" alt="logo" />

export interface Poll{
  question : string;
  choices:Array<string>;
  id:number;
  comments:string[];
}



function App() {

  const [poll, setpoll] = useState<Poll>();
  const [newQuestion, setNewQuestion] = useState<string>("Question");
  const [choices, setchoices] = useState<Array<string>>();
  const [choice1, setchoice1] = useState<string>("Answer1");
  const [choice2, setchoice2] = useState<string>("Answer2");
  const [choice3, setchoice3] = useState<string>("Answer3");
  const [answers, setanswers] = useState<Array<string>>();

  const lista:Array<string>=[]

  async function updatepoll(){
    const response=await axios.get("http://localhost:8080/poll");
    setpoll(response.data);
    }

      useEffect(() => {
      updatepoll();
    }, []);

    const p=JSON.stringify(poll)


  return (
    <div className="App">
      <header className="App-header">
        <h1>Pollstar</h1>
      </header>

      <Button onClick={async ()=>{await updatepoll();alert(p)}} variant="outlined" color="primary" href="#contained-buttons">
      ANSWER POLE
    </Button>



    <Form>
  <Form.Group>
    <Form.Label>Enter your question:</Form.Label>
    <Form.Control type="text"  onChange={e => {
          setNewQuestion(e.target.value);
        }}/>
  </Form.Group>

  <Form.Group>
    <Form.Label>Enter your first choice:</Form.Label>
    <Form.Control type="text"  onChange={e => {
          setchoice1(e.target.value);
        }}/>
  </Form.Group>

  <Form.Group>
    <Form.Label>Enter your second choice:</Form.Label>
    <Form.Control type="text"  onChange={e => {
          setchoice2(e.target.value);
        }}/>
  </Form.Group>

  <Form.Group>
    <Form.Label>Enter your third choice:</Form.Label>
    <Form.Control type="text"  onChange={e => {
          setchoice3(e.target.value);
          
        }}/>
  </Form.Group>
      
  <Button type="submit"  onClick={async ()=>{await setchoices([choice1,choice2,choice3]); axios.post("http://localhost:8080/poll/create",
        { question: newQuestion,choices:choices }
      )}}>
    Click here to submit poll
  </Button>
</Form>
<br></br>

<FormGroup>
<Form.Label >{newQuestion}</Form.Label>
      
  {choices?.map(choice => {
              return (
              <FormGroup>
                <FormLabel>{choice}</FormLabel>
                <FormCheck type="checkbox" checked={false} onChange={e=>{
                    lista.push(choice)
                }}/>
                </FormGroup>
      )})}
    </FormGroup>
    <Button type="submit"  onClick={async()=>{setanswers(lista) ; await axios.put("http://localhost:8080/poll/multipleanswer",
        { id: 0,choices:answers }
      )}}>
    Click here to submit answer to the poll
  </Button>
  

  <Comment ></Comment>

  <Answer></Answer>
  
  </div>
  );

}


export default App;


