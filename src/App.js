import logo from './logo.svg';
import './App.css';
import BracketGrid from './BracketGrid.js'
import teams from './Teams.js'
import initState from './InitState.js'
import {useState} from 'react'

function App() {
  const [state, setState] = useState(initState)


  return (
    <div className="App">
      <BracketGrid teams={teams} state={state} setState={setState}/>
    </div>
  );
}

export default App;
