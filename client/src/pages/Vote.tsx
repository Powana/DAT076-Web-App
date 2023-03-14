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
    // To solve issue where all choices are not displayed unless page is refreshed
    // Define inner function to allow the await keyword
    // Might not have been needed, could have been bug in backend
    async function getPoll() {
      const response = await axios.get("http://localhost:8080/poll/" + id)
      setChoices(response.data.choices);
      setQuestion(response.data.question);
      setComments(response.data.comments);
    }
    getPoll();
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
      <div className='submitButton mt-5 mb-9'>
        <Button onClick={submitVote}>Submit choice</Button>
      </div>
        <CommentSection id={(id ? id : "-1")} ogComments={comments}></CommentSection>
    </div>
    </div>
  )
}

export default Vote