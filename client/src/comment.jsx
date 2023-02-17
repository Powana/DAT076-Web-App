import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import React, { useState} from 'react';




function Comment(){
  const [variable, setVariable] = useState('');
  return (
    <div>
      <Form>
    <Form.Group>
      <Form.Label>Enter your comment:</Form.Label>
      <Form.Control type="text"  onChange={e => {
            setVariable(e.target.value);
          }}/>
    </Form.Group>
  </Form> 

  <Button type="submit"  onClick={async ()=>{ 
    await axios.put("http://localhost:8080/poll/comment",
          { id: 0, comment:variable})}}>
      Click here to comment poll
    </Button>

    </div>
  )}


  export default Comment;
 