import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Login from './Layout/Login/Login';
import Dashboard from './Layout/Dashboard/Dashboard';

import WelcomeScreen from './Layout/NewRace/WelcomeScreen';
import NewRace from './Layout/NewRace/NewRace';
import RaceResults from './Layout/RaceResults/RaceResults';
import SelfEntry from './Layout/RaceResults/SelfEntry';
import Main from './Main';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route path="/lmsa" element={<SelfEntry />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
