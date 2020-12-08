import React from 'react';
import './App.css';
import { Interval } from './components/interval';
import { INTERVALS } from './components/interval/_constants';
import { ListOfOptions } from './components/list-of-options';
import { listItem } from './components/list-of-options/mock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
    <div className="Interval">
      <Interval intervalConfig={INTERVALS}/>
  </div>
  <ListOfOptions option={listItem} />
      </header>
    </div>
  );
}

export default App;
