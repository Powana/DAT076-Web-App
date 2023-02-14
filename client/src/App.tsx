import './App.css';
import {SingleChoiceList} from './components/SingleChoiceList';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const choices = ["Choice 1", "Choice 2", "Choice 3" , "Choice 4"]

function App() {

  const [choice, setChoice] = useState();

  function submitVote(): void {
    alert(choice)
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
