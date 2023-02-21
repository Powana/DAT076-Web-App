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


/*
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
*/




function Choicefield({handleCChange} :{handleCChange:(event:React.ChangeEvent<HTMLInputElement>) => void} ){
  return (
    <div className="Choicebox">
      <form>
        <label>Enter answer</label>
        <input type="text" placeholder="option" name="choiceArray" onChange={handleCChange}/>
      </form>
    </div>
  );
};

function Questionfield({handleQChange} :{handleQChange:(event:React.ChangeEvent<HTMLInputElement>) => void} ){
  return (
    <div className="Questionbox">
      <h2> Create a question </h2>
      <form>
        <label>Enter question</label>
        <input type="text" placeholder="Question" name="question" onChange={handleQChange}></input>
      </form>
    </div>
  );
}


function Submit() {
  return (
    <div className="Button">
      <Button variant="primary" >Submit</Button>{' '}
    </div>
  );
}

<<<<<<< Updated upstream:client/src/pages/Create.tsx
function Create() {
=======
/*
function Submit({handleSubmit} :{handleSubmit:(event:React.MouseEvent<HTMLButtonElement>) => void} ) {
  return (
    <div className="Button">
      <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
    </div>
  );
}
*/

function App() {
  interface IChoice {
    id: number;
    choicetext: string;
  }
  
  interface Poll {
    id: number;
    question: string;
    choices: Map<IChoice, number>;
  }
  
  interface ChoiceItemProps {
    key: number;
    choicetext: string;
  }
  
  
>>>>>>> Stashed changes:client/src/App.tsx
  const [iChoices, setIChoicees] = useState<IChoice[]>([])
  const [numChoices, setNumChoices] = useState<number>(3);
  const [question, setQuestion] = useState<string>()
  const [choices, setChoices] = useState<string[]>()

  //TODO fix this function, look att lecturecode
  useEffect(()=>
  async function uppdatePoll(){
    const response = await axios.push<Poll>("http://localhost:8080/poll;")
  }
  )

  function handleQChange(event: React.ChangeEvent<HTMLInputElement>){
    setQuestion(event.target.value)
    console.log(question);
  };

  function handleCChange(event: React.ChangeEvent<HTMLInputElement>){
    console.log(choices);
  };
/* 
  function handleCChange1(event: React.ChangeEvent<HTMLInputElement>){
    setChoices(choices.push(event.target.value))
    console.log(choices);
  };

  function handleCChange2(event: React.ChangeEvent<HTMLInputElement>){
    setChoices((prev)=>{
       return{...prev, choices}
    });
    console.log(choices);
  };

  function handleCChange3(event: React.ChangeEvent<HTMLInputElement>){
    choices.push(setChoices(event.target.value))
    console.log(choices);
  };
  */
  

  function Plus_answer() {
    return (
      <span className="Button">
        <Button onClick={handlePlus}>+</Button>{''}
      </span>
    );
  };

  function handlePlus() {
    setNumChoices(numChoices => numChoices + 1);
  };

  function handleSubmit (event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    console.log()
  }

  


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
              <Questionfield handleQChange = {handleQChange} />
              <div className="choiceBox">
                <h2 >Possible answers </h2>
                <div>
                  {Array.from(Array(numChoices).keys())
                    .map((n: number) => {
                      return <Choicefield key={n} handleCChange = {handleCChange}  />
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
