import React from 'react';
import Home from '../components/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Cars from '../components/Cars';

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/dealers' element ={<Cars/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;