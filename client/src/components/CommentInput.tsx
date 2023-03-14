import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from "react-router-dom";
import CommentResult from "../components/CommentResult";

interface CommentInputProps {
  id: string;
  setCommentSubmitted: (value: boolean) => void;
}

export default function CommentInput(props: CommentInputProps){
  const { id } = useParams();
  //const navigate = useNavigate();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentSubmitted, setCommentSubmitted] = useState(false);


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        await axios.post(`http://localhost:8080/poll/${id}`, {
          name: name,
          text: comment,
        });
        setName("");
        setComment("");
        setCommentSubmitted((prev: boolean) => !prev);
        
      } catch (error) {
        console.log(error);
      }
    }


    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formComment">
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
      </Form>
    );
  }
  