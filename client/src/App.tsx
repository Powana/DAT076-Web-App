import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ChoiceList} from './components/ChoiceList';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
        <header className='App-header'>
          <h1>Pollstar</h1>
        </header>
      <div className='App-content'>
        <div className='App-choices'>
          <ChoiceList></ChoiceList>
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
