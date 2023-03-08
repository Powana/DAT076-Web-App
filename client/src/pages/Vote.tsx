import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { SingleChoiceList } from "../components/SingleChoiceList";

function Vote() {

  const { id } = useParams();

  const [question, setQuestion] = useState("")
  const [choices, setChoices] = useState([]);
  const [chosenId, setChosenId] = useState();
  const navigate = useNavigate();
  //TODO: add id to get request
  useEffect(() => {
      axios.get("http://localhost:8080/poll/" + id).then((response) => {
          setChoices(response.data.choices);
          setQuestion(response.data.question)
      });
  }, []);
  
  async function submitVote() {
    // Vote using the chosen choice ID
    await axios.put("http://localhost:8080/poll", {'pollID': id, 'choice': chosenId})
    navigate("/result/" + id);
  }
  //TODO: Here we need conditional logic that uses "PollType"
  //      If it is a single choice poll, render a SingleChoiceList component
  return (
    <div className="Vote">
      <div className='App-content'>
    
      <h3>{question}</h3>
      <h4>Poll ID: {id}</h4>
      <div className='App-choices'>
        <SingleChoiceList choices={choices} setChoice={setChosenId}></SingleChoiceList>
      </div>
      <div className='submitButton'>
      <Button onClick={submitVote}>Submit choice</Button>
      </div>
    </div>
    </div>
  )
}

export default Vote