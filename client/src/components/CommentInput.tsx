import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function CommentInput(props: {id: string}){
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    async function submitComment() {
        try {
            let res = await axios.post(
                "https://pollstar.larssontech.com/poll/"+ props.id, 
                { "name": name, "text": comment })
    
          } catch(error) {
            console.log(error)
          }
    }

    return (
      <div className="comment-input">
          <Form>
            <Form.Group>
              <Form.Label>Enter your name:</Form.Label>
                <Form.Control type="text" required onChange={e => {setName(e.target.value);}}/>
              
              <Form.Label>Enter your comment:</Form.Label>
                <Form.Control type="text" required onChange={e => {setComment(e.target.value);}}/>
            </Form.Group>
          </Form>
          <Button onClick={(e) => submitComment()}>Sumbit comment</Button>
      </div>
    )
}