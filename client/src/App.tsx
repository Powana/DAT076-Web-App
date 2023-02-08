import React, {useState} from 'react';
import './App.css';

function App() {
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
    <div className="Apps">
      {question}
      Choices:
      {choices?.map(choice => {
          return <li>{choice[0]}</li>;
        })}
    </div>
  );
}

export default App;
