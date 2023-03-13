import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
//import CommentSection from "../components/CommentSection";
import CommentInput from "../components/CommentInput";
import CommentResult from "../components/CommentResult";

import { SingleChoiceList } from "../components/SingleChoiceList";
import '../App.css'

function Vote() {

  const { id } = useParams();

  const [question, setQuestion] = useState("")
  const [choices, setChoices] = useState([]);
  const [chosenId, setChosenId] = useState(-1);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
      axios.get("http://localhost:8080/poll/" + id).then((response) => {
          setChoices(response.data.choices);
          setQuestion(response.data.question);
          setComments(response.data.comments);
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
      <div className="id_vote">
        <p > ID : {id}  </p>
      </div>
      <div className='App-content'>
      <h3 >{question}</h3>
      
      <div className='App-choices'>
        <SingleChoiceList choices={choices} setChoice={setChosenId}></SingleChoiceList>
      </div>
      <div className='submitButton'>
        <Button onClick={submitVote}>Submit choice</Button>
      </div>
      <div className="comment-area">
      <h5 >Add a comment</h5>
      
        <CommentInput id={(id ? id : "1")}></CommentInput>
        <CommentResult id={(id ? id : "1")} comments={comments}></CommentResult>
    </div>
    <a  className="exit_button" href="../redirect"><Button variant="outline-danger">Back to start page</Button></a>     
    </div>
    </div>
    
  )
}

export default Vote