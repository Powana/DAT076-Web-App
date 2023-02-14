import React, {useState} from 'react';
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
      {question}
      Choices:
      <ul>
      {choices?.map(choice => {
          return <li>{choice}</li>;
        })}
      </ul>
    </div>
  );
}

export default PollEditApp;
