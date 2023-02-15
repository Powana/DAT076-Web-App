import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SingleChoiceList } from "../components/SingleChoiceList";

function Vote() {

    const { id } = useParams();
    //TODO: add id to get request
    useEffect(() => {
        axios.get("http://localhost:8080/poll").then((response) => {
            setChoices(choicesToList(response.data.choices))
        });
    }, []);

    const [choices, setChoices] = useState(new Array<String>);
    const [choice, setChoice] = useState("");

    // Ugly temporary fix. Component needs a list of choices, API provides object...
    function choicesToList(choicesObject: {}): Array<String> {
        let choiceList= new Array<String>
        for (var key in choicesObject) {
            choiceList.push(key)
        }
        return choiceList;
    }
    
    function submitVote(): void {
        // Extracts button id from child, translates to actual choice
        let c = choices[parseInt(choice)];
        alert(c)
        axios.put("http://localhost:8080/poll", {'choice': c})
    }
    //TODO: Here we need conditional logic that uses "PollType"
    //      If it is a single choice poll, render a SingleChoiceList component
    return (
      <div className="Vote">
        <h2>Vote</h2>
        <div className='App-content'>
        <div className='App-choices'>
          <SingleChoiceList choices={choices} setChoice={setChoice}></SingleChoiceList>
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