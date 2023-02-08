import React from 'react';
import logo from './logo.svg';
import './App.css';
import { text } from 'stream/consumers';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Choicefield() {
  return (
      <div className ="Choicebox">
        <form>
        <label>Enter answer</label>
        <input type="text" name="ans"></input>
      </form>
      </div>
  );
}

function Questionfield() {
    return (
      <div className="Questionbox">
       <h2> Create a question </h2>
        <form>
          <label>Enter question</label>
          <input type="text" placeholder="Question" name="ques"></input>
        </form>
    </div>
    );
  }


  function Submit() {
    return (
      <div>
        <Button variant="primary">Submit</Button>{' '}
    </div>
    );
  }

  function Add_answer() {
    return (
      <div>
        <Button variant="primary">add Answer</Button>{''}
      </div>
    );
  }
  

  function PollNavBar() {
    return(
        <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">PollStar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }

  function Create_page(){
    return(
    <div>
      <div className="container text-center"></div>
    
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="NewPoll">
              <Questionfield /> 
              <h2 >Possible answers </h2>
              <Choicefield/>
              <Choicefield/>
              <Choicefield/>
              <Add_answer/>
              <Submit/>
          
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
    );
  }
  export default Create_page