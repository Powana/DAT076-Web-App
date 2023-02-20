import React, {useState} from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import './PollEditApp.css';

function PollEditApp() {
  const [question, setQuestion] = useState<string>();
  const [choices, setChoices] = useState<Array<string>>();

  React.useEffect(() => {

    fetch("/poll")
      .then((res) => res.json())
      .then((data) => {
          setQuestion(data.question);
          setChoices(data.choices);
      })
      .catch((err) => {
        console.log(err.message);
     });
  }, []);

  return (
    <div className="PollEditApp">
      <Form className="mb-3">
        <FormGroup>
          <FormLabel>Question</FormLabel>
          <FormControl type="text" value={question}/>
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Choices:</FormLabel>
          {choices?.map(choice => {
              return (
              <FormGroup>
                <FormLabel>Choice</FormLabel>
                <FormControl type="text" value={choice}/>
              </FormGroup>
              )
            })}
        </FormGroup>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default PollEditApp;
