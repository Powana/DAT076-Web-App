import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {

    const [id, setId] = useState(-1)
    const [availablePollIds, setAvailablePollIds] = useState([0])

    useEffect(() => {
      axios.get("http://localhost:8080/poll/").then((response) => {
        let ids = response.data.map((obj: { id: number; }) =>
          obj.id);
        setAvailablePollIds(ids);
      });
    }, []);

    // This is used to render the buttons differently depending on a correct and existing integer pollid
    let voteButton;
    let editButton;
    if (Number.isInteger(id) && id >= 1 && availablePollIds.includes(id)) {
        voteButton = <Link to={("/vote/"+ id)}><Button>Vote on Poll</Button></Link>;
        editButton = <Link to={("/edit/"+ id)}><Button>Edit Poll</Button></Link>;
    } else {
        voteButton = <Button disabled>Vote on Poll</Button>;
        editButton = <Button disabled>Edit Poll</Button>;
    }

    return (
      <div className="Home">
        <Link to="/create"><Button>Create new Poll</Button></Link>
        
        <div className="Home-vote">
          <InputGroup size="sm" className="mb-3 mt-5">
              <InputGroup.Text id="inputGroup-sizing-sm">ID</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                    setId(parseInt(e.target.value))
                }
              }
              />
          </InputGroup>
      <InputGroup className="mb-1">
        {voteButton}
      </InputGroup>
      <InputGroup>
        {editButton}
      </InputGroup>
        </div>
      </div>
    )
  }
  
  export default Home