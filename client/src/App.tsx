import React from 'react';
import logo from './logo.svg';
import './App.css';
import Create_page from './pollcomponents'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    
          <div className="PollStar">
            <header className="Poll-header">
              <h1 >Pollstar</h1>
            </header>
            <Create_page/>
          </div>
 
  );
}

export default App;
