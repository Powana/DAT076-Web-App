import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import ChoiceResult from "../components/ChoiceResult";
import piechart from "../images/piechart.png"
import CommentSection from "../components/CommentSection";

function Result() {


    const [question, setQuestion] = useState<string>();
    const [choices, setChoices] = useState<any[]>();
    const [comments, setComments] = useState([]);
    const { id } = useParams(); // Gets current id from url
    
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

    
    const choiceResults = choices?.map(
      choice => {
        return (
          <ChoiceResult choice={choice.text} votes={choice.votes}></ChoiceResult>
        )
      }
    )
   

    return (
      <div className="Result">
        <div className='spinner'>
          <img src={piechart} alt="" width="300" height="300"></img>
        </div>
        <h3>{question}</h3>
        <Table striped bordered >
          <thead>
            <tr>
              <th>Choice</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {choiceResults}
          </tbody>
        </Table>
        <a  className="button" href="../redirect"><Button>Back to start page</Button></a>     
        <CommentSection id={(id ? id : "-1")} ogComments={comments}></CommentSection>
      </div>
    )
  }
  
  export default Result