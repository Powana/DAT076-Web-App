import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SingleChoiceList} from './components/SingleChoiceList';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const choices = ["Choice 1", "Choice 2", "Choice 3" , "Choice 4"]

function App() {

  return (
    <div className="App">
        <header className='App-header'>
          <h1>Pollstar</h1>
        </header>
      <div className='App-content'>
        <div className='App-choices'>
          <SingleChoiceList choices={choices}></SingleChoiceList>
        </div>
        <br/>
        <div className='submitButton'>
        <Button>Submit choice</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
