import React, { useState } from "react";
import Rectangle from "./create";
import { Button} from 'react-bootstrap';
import { Form} from 'react-bootstrap';


const Relleno=(props)=> {
  return (
    <div>
      <div>Question:{props.question}</div>
      The answers are:
      <div>Choice 1:{props.choice_1}</div>
      <div>Choice 2:{props.choice_2}</div>
      <div>Choice 3:{props.choice_3}</div>


    </div>
  )}


  export default Relleno;
 