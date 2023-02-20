import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SingleChoiceList } from "../components/SingleChoiceList";

function Vote() {

  const { id } = useParams();

  const [question, setQuestion] = useState("")
  const [choices, setChoices] = useState([]);
  const [chosenId, setChosenId] = useState();
  //TODO: add id to get request
  useEffect(() => {
      axios.get("http://localhost:8080/poll").then((response) => {
          setChoices(response.data.choices);
          setQuestion(response.data.question)
      });
  }, []);
  
  function submitVote(): void {
      // Vote using the chosen choice ID
      alert(chosenId)
      axios.put("http://localhost:8080/poll", {'choice': chosenId})
  }
  //TODO: Here we need conditional logic that uses "PollType"
  //      If it is a single choice poll, render a SingleChoiceList component
  return (
    <div className="Vote">
      <div className='App-content'>
      <h3>{question}</h3>
      <div className='App-choices'>
        <SingleChoiceList choices={choices} setChoice={setChosenId}></SingleChoiceList>
      </div>
      <br/>
      <div className='submitButton'>
      <Button onClick={submitVote}>Submit choice</Button>
      </div>
    </div>
    </div>
  )
}

export default Vote