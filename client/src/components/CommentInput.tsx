import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from "react-router-dom";


export default function CommentInput(props: {id: string}){
  const { id } = useParams();
  const navigate = useNavigate();
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    async function submitComment() {
        try {
             await axios.post(
                "http://localhost:8080/poll/"+ props.id, 
                { "name": name, "text": comment });
                navigate("/result/" + id);
    
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