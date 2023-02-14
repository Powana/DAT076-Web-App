import React, {useEffect, useState} from 'react';
//import logo from './logo.png';
import './App.css';
import { Button,Form} from 'react-bootstrap';
import axios from 'axios';
import CFormCheck from '@coreui/react'

//Components
import Relleno from './components/answer';
//import Bcreate from './components/create';
// <img src={logo} className="App-logo" alt="logo" />

export interface Poll{
  question: string;
  choices:Array<string>;
}

function App() {

  const [poll, setpoll] = useState<Poll>();
  const [newQuestion, setNewQuestion] = useState<String>("");
  const [choice1, setchoice1] = useState<String>("");
  const [choice2, setchoice2] = useState<String>("");
  const [choice3, setchoice3] = useState<String>("");

  async function updatepoll(){
    const response= await axios.get<Poll>("http://localhost:8080/poll");
    setpoll(response.data);
  }

    useEffect(() => {
      updatepoll();
    }, []);

  const x=JSON.stringify(poll);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pollstar</h1>
      </header>
      <Button onClick={()=>{alert(x)}} variant="outlined" color="primary" href="#contained-buttons">
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

  <Button type="submit"  onClick={()=>{ axios.post("http://localhost:8080/poll/firstcreate",
        { question: newQuestion,choices:[choice1,choice2,choice3] }
      )}}>
    Click here to submit poll
  </Button>

</Form>
<br></br>



<Relleno question={newQuestion} choice_1={choice1} choice_2={choice2} choice_3={choice3}></Relleno>
    </div>
  );
}

export default App;
