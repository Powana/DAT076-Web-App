import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
function Home() {

    const [id, setId] = useState(-1)

    // This is used to render the vote button differently depending on a correct integer id
    let voteButton;
    if (Number.isInteger(id) && id >= 1) {
        voteButton = <Link to={("/vote/"+ id)}><Button>Vote on Poll</Button></Link>;
    } else {
        voteButton = <Button disabled>Vote on Poll</Button>
    }

    //TODO: Create should GET new id
    return (
      <div className="Home">
        <Link to="/create"><Button>Create new Poll</Button></Link>
        
        <div className="Home-vote">
        <InputGroup size="sm" className="mb-3">
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
        {voteButton}
        </div>
      </div>
    )
  }
  
  export default Home