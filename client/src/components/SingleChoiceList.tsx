import React, { useEffect, useImperativeHandle, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export function SingleChoiceList(props : {choices : Array<String>}) {


  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('-1');

  const radios = props.choices.map(
    (choice, index) => ({name : choice, value : index.toString()})
  )


  return (
    <>
      <ButtonGroup vertical className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}