import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { SingleChoiceList } from "../components/SingleChoiceList";

function Vote() {

  const { id } = useParams();

  const [question, setQuestion] = useState("")
  const [choices, setChoices] = useState([]);
  const [chosenId, setChosenId] = useState(-1);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
      axios.get("https://pollstar.larssontech.com/poll/" + id).then((response) => {
          setChoices(response.data.choices);
          setQuestion(response.data.question);
          setComments(response.data.comments);
      });
  }, []);
  
  async function submitVote() {
    // Vote using the chosen choice ID
    await axios.put("https://pollstar.larssontech.com/poll", {'pollID': id, 'choice': chosenId})
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
        <CommentSection id={(id ? id : "1")} comments={comments}></CommentSection>
    </div>
    </div>
  )
}

export default Vote