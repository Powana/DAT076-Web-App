import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import ChoiceResult from "../components/ChoiceResult";
import piechart from "../images/piechart.png"

function Result() {


    const [question, setQuestion] = useState<string>();
    const [choices, setChoices] = useState<any[]>();
    const { id } = useParams(); // Gets current id from url
    
    useEffect(() => {
        axios.get("http://localhost:8080/poll/" + id).then((response) => {
            setQuestion(response.data.question);
            setChoices(response.data.choices);
        });
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
      </div>
    )
  }
  
  export default Result