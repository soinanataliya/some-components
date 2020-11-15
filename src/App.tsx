import React from 'react';
import './App.css';
import { Interval } from './components/interval';
import { INTERVALS } from './components/interval/_constants';

function App() {
  return (
    <div className="App">
      <header className="App-header">
    <div className="Interval">
      <Interval intervalConfig={INTERVALS}/>
  </div>
      </header>
    </div>
  );
}

export default App;
