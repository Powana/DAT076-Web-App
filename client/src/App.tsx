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
  const [newQuestion, setNewQuestion] = useState<String>("Question");
  const [choice1, setchoice1] = useState<String>("Answer1");
  const [choice2, setchoice2] = useState<String>("Answer2");
  const [choice3, setchoice3] = useState<String>("Answer3");
  const [commentt, setcomment] = useState<String>("hola");
  const [newanswer, setnewanswer] = useState<String>("NUEVO");


  async function updatepoll(){
    const response= await axios.get<Poll>("http://localhost:8080/poll");
    setpoll(response.data);
  }

      useEffect(() => {
      updatepoll();
    }, []);

    const y=JSON.stringify(choice1)
    const z=JSON.stringify(choice2)
    const w=JSON.stringify(choice3)
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

  <Button type="submit"  onClick={()=>{ axios.post("http://localhost:8080/poll/firstcreate",
        { question: newQuestion,choices:[choice1,choice2,choice3] }
      )}}>
    Click here to submit poll
  </Button>
</Form>
<br></br>

<Form>
<Form.Label>{newQuestion}</Form.Label>
      {[y,z,w].map((type) => (
        <div key={`-${type}`} className="mb-3">
          <Form.Check 
            type='checkbox'
            id={`-${type}`}
            label={` ${type}`}
          />   
        </div>
      ))}
    </Form>

  



  <Form>
  <Form.Group>
    <Form.Label>Enter your comment:</Form.Label>
    <Form.Control type="text"  onChange={e => {
          setcomment(e.target.value);
        }}/>
  </Form.Group>
 </Form> 

<Button type="submit"  onClick={async ()=>{ 
  await axios.put("http://localhost:8080/poll/comment",
        { id: 0, comment:commentt})}}>
    Click here to comment poll
  </Button>



  <Form>
  <Form.Group>
    <Form.Label>Enter your new answer:</Form.Label>
    <Form.Control type="text"  onChange={e => {
          setnewanswer(e.target.value);
        }}/>
  </Form.Group>
 </Form> 

<Button type="submit"  onClick={async ()=>{ 
  await axios.post("http://localhost:8080/poll/addanswer",
        { id: 0, choice:newanswer})}}>
    Click here to add new answer to the poll
  </Button>


  </div>
  );

}

export default App;
