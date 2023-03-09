import React, { useEffect, useImperativeHandle, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export function SingleChoiceList(props : {choices : Array<{id: number, text: string, votes: number}>, setChoice: (id: number) => void}) {


  const [radioValue, setRadioValue] = useState(-1);
  function updateChoice(choiceId: number): void {
    setRadioValue(choiceId);
    props.setChoice(choiceId);
  }

  return (
    <>
      <ButtonGroup vertical className="mb-2" data-testid="SingleChoiceList">
        {props.choices.map((choice, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={choice.id}
            checked={radioValue === choice.id}
            onChange={(e) => updateChoice(parseInt(e.currentTarget.value))}
            data-testid="SingleChoiceListButton"
          >
            {choice.text}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}