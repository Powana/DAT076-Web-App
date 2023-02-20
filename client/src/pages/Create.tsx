import React, { useEffect, useState } from 'react';
import './Create.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Toast from 'react-bootstrap/Toast';

function BasicExample() {
  return (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
  );
}


interface IChoice {
  id: number;
  choicetext: string;
}

interface Poll {
  id: number;
  question: string;
  choices: Map<IChoice, number>;
}

function Questionfield() {
  return (
    <div className="Questionbox">
      <h2> Create a question </h2>
      <form>
        <label>Enter question</label>
        <input type="text" placeholder="Question" name="ques"></input>
      </form>
    </div>
  );
}

interface ChoiceItemProps {
  key: number;
  choicetext: string;
}


function Choicefield() {
  return (
    <div className="Choicebox">
      <form>
        <label>Enter answer</label>
        <input type="text" placeholder="option" name="ans"></input>
      </form>
    </div>
  );
};


/*
function ChoiceItem({choicetext}:ChoiceItemProps) {
  return (
    Choicefield
  );
};
*/

function ChoiceItem({ choicetext }: ChoiceItemProps) {
  return (
    <div className="Choicebox">
      <form>
        <label>Enter answer</label>
        <input type="text" placeholder="option" name="ans"></input>
      </form>
    </div>
  );
};

/*
function Add_answer() {
  return (
    <div className="Button">
      <Button variant="primary" onClick= {moreChoice}>add Answer</Button>{''}
    </div>
  );
};
*/


function Submit() {
  return (
    <div className="Button">
      <Button variant="primary" onClick={() => BasicExample()}>Submit</Button>{' '}
    </div>
  );
}

function Create() {
  const [iChoices, setIChoicees] = useState<IChoice[]>([])
  const [numChoices, setNumChoices] = useState<number>(3);
  
  function handlePlus() {
    setNumChoices(numChoices => numChoices + 1);
  };

  function Plus_answer() {
    return (
      <span className="Button">
        <Button onClick={handlePlus}>+</Button>{''}
      </span>
    );
  };


  return (
    <div className="PollStar">
      <header className="Poll-header">
        <h1 >Pollstar</h1>
      </header>
      <div>
        <div className="container text-center"></div>

        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="NewPoll">
              <Questionfield />
              <div className="choiceBox">
                <h2 >Possible answers </h2>
                <div>
                  {Array.from(Array(numChoices).keys())
                    .map((n: number) => {
                      return <Choicefield key={n} />
                    })}
                </div>
              </div>
              <Plus_answer />
              <Submit />
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>

    </div>

  );
};

export default Create;
