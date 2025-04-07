import './App.css';
import BracketGrid from './BracketGrid.js'
import Controls from './Controls.js'
import teamsData from './Teams.json'
import teamsWData from './TeamsW.json'
import initState from './InitState.json'
import initStateW from './InitStateW.json'
import {useState} from 'react'
import {clearBracket, advanceTeam, randomizeBracket, checkProbability, checkOneProbability, checkProbabilityW} from './Logic.js'
import SaveBracket from './SaveBracket.js';

function App() {
  const [state, setState] = useState(initState)
  const [controls, setControls] = useState({useB: true, useK: true, useE: true, useM: true, useT: true, useH: true, useWR: false, useWM: false, useWT: false})
  const [isMens, setIsMens] = useState(true)
  const [teams, setTeams] = useState(teamsData)


  return (
    <div className="App">
      <title>Bracket Maker</title>
      <Controls state={state} isMens={isMens} setIsMens={setIsMens} initState={initState} initStateW={initStateW} setState={setState} controls={controls} setControls={setControls} teams={teams} setTeams={setTeams} teamsM={teamsData} teamsW={teamsWData} clearBracket={clearBracket} randomizeBracket={randomizeBracket}/>
      <SaveBracket state={state} setState={setState} isMens={isMens} setIsMens={setIsMens}/>
      <BracketGrid teams={teams} isMens={isMens} state={state} setState={setState} advanceTeam={advanceTeam} controls={controls} checkProbability={checkProbability} checkProbabilityW={checkProbabilityW} checkOneProbability={checkOneProbability}/>
    </div>
  );
}

export default App;
