import axios from 'axios'
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';


function Answer(){
    const [variable, setVariable] = useState('');
    return(
    <div>
        <Form>
        <Form.Group>
            <Form.Label>Enter your new answer:</Form.Label>
            <Form.Control type="text"  onChange={e => {
                setVariable(e.target.value);
                }}/>
        </Form.Group>
        </Form> 

        <Button type="submit"  onClick={async ()=>{ 
        await axios.post("http://localhost:8080/poll/addanswer",
                { id: 0, choice:variable})}}>
            Click here to add new answer to the poll
        </Button>

    </div>
    )
}
export default Answer;