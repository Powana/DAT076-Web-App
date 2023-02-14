import './App.css';
import {SingleChoiceList} from './components/SingleChoiceList';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

const choices = ["A", "B", "C"]

function App() {

  // Used to fetch choice state from child
  const [choice, setChoice] = useState("");

  function submitVote(): void {
    let c = choices[parseInt(choice)];
    alert(c)
    axios.put("http://localhost:8080", {choice: c})
  }

  return (
    <div className="App">
        <header className='App-header'>
          <h1>Pollstar</h1>
        </header>
      <div className='App-content'>
        <div className='App-choices'>
          <SingleChoiceList choices={choices} setChoice={setChoice}></SingleChoiceList>
        </div>
        <br/>
        <div className='submitButton'>
        <Button onClick={submitVote}>Submit choice</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
