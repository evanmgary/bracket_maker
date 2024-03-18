import './App.css';
import BracketGrid from './BracketGrid.js'
import Controls from './Controls.js'
import teams from './Teams.json'
import initState from './InitState.json'
import {useState} from 'react'
import {clearBracket, advanceTeam, randomizeBracket, checkProbability} from './Logic.js'
import SaveBracket from './SaveBracket.js';

function App() {
  const [state, setState] = useState(initState)
  const [controls, setControls] = useState({useB: true, useK: true, useE: true, useM: true, useT: true, useH: true})


  return (
    <div className="App">
      <Controls state={state} initState={initState} setState={setState} controls={controls} setControls={setControls} teams={teams} clearBracket={clearBracket} randomizeBracket={randomizeBracket}/>
      <SaveBracket state={state} setState={setState}/>
      <BracketGrid teams={teams} state={state} setState={setState} advanceTeam={advanceTeam} controls={controls} checkProbability={checkProbability}/>
    </div>
  );
}

export default App;
