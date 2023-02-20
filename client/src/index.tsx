import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Result from './pages/Result';
import Vote from './pages/Vote';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="App">
        <header className='App-header'>
          <h1>Pollstar</h1>
        </header>
      <div className='content'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create/' element={<Create/>}/>
          <Route path='/vote/:id' element={<Vote/>}/>
          <Route path='/result/:id' element={<Result/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
