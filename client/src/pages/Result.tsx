import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import ChoiceResult from "../components/ChoiceResult";
import home from "./Home";
import piechart from '../image/piechart.png';
import '../App.css'

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

    //TODO: Calculate and sort by top choice(s)
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
    <div className="id_vote">
        <p > ID : {id}  </p>
      </div>
        <h3 >{question}</h3>
        <Table striped bordered  >
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
        <a  className="exit_button" href="../redirect"><Button variant="outline-danger">Back to start page</Button></a>     
      </div>
    )
  }
  
  export default Result