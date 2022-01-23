import React from 'react';
import { Routes, Route } from "react-router-dom";


// Components
import Weather from './components/weather';

const Routers = function() {
  return (
    <Routes>
      <Route path="/" element={<Weather />}/>
    </Routes>
  )
}

export default Routers;