import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";


export default function CommentInput(props: {id: string, appendComment: (name: string, text: string) => void}) {
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  async function handleSubmitComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/poll/"+ props.id, 
        { "name": commentName, "text": commentText }).catch((error) => {
          if (error.response) {
            alert("Error code: " + error.response.status)
          }
        });
      
      props.appendComment(commentName, commentText)
    } 
    catch(error) {
      alert("Could not submit comment.")
      console.log(error)
    }
  }

  return (
    <div className="comment-input">
        <Form onSubmit={handleSubmitComment}>
          <FormGroup>
            <FormLabel>Enter your name:</FormLabel>
              <FormControl type="text" required onChange={e => {setCommentName(e.target.value);}}/>
            
            <FormLabel>Enter your comment:</FormLabel>
              <FormControl type="text" required onChange={e => {setCommentText(e.target.value);}}/>
          </FormGroup>
        <Button type="submit">Submit comment</Button>
        </Form>
    </div>
  )
}