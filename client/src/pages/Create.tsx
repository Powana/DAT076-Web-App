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

function Choicefield(props: {idx: number}) {
  return (
    <div className="Choicebox">
      <form>
        <label>Enter answer</label>
        <input type="text" placeholder="Option" name={props.idx.toString()}></input>
      </form>
    </div>
  );
};


function Create() {
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
                  {[...Array(numChoices)].map((_, i) =>
                    <Choicefield idx={i} />
                  )}
                </div>
              </div>
              <Plus_answer />
              <Button variant="primary" type="submit" onClick={() => BasicExample()}>Submit</Button>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>

    </div>

  );
};

export default Create;
