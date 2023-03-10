import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Result from './pages/Result';
import Vote from './pages/Vote';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';




//<img src="./logo.png" alt="" width="300" height="300"></img>
function App() {
  

  return (
    <div className="App">
    <header className='Poll-header'>
      <h1>POLLSTAR</h1>
    </header>
  <div className='content'>
  
       
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create/' element={<Create/>}/>
      <Route path='/vote/:id' element={<Vote/>}/>
      <Route path='/result/:id' element={<Result/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/redirect' element={<Navigate to="/"/>}/>
    </Routes>
  </BrowserRouter>


  </div>
  
</div>
  );
}

export default App;