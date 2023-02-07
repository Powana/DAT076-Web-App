import React, { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { getPoll } from '../service/http.service';

export function ChoiceList() {


  //TODO: Where should service call be? How should values be updated?
  let question = '';
  let choices = [];

  useEffect(() => {
    async function getData() {
        const result = await getPoll(1);
    }
  }, []);


  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Choice one', value: '1' },
    { name: 'Choice two', value: '2' },
    { name: 'Choice three', value: '3' },
  ];

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