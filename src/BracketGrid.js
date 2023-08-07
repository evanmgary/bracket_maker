import React from 'react'
import './BracketGrid.css'
import BracketSlot from './BracketSlot.js'

function BracketGrid(props){
    let state = props.state
    let stateKeys = Object.keys(state)

    function findRow(id){
        const round = parseInt(id[0])
        const region = id[1]
        const offset = 0
        let row = 0
        let seed = id[2]
        if (id.length > 3){
            seed += id[3]
        }
        seed = parseInt(seed)
        const firstround = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15]
        if (round == 1){
            row = (firstround.indexOf(seed) + 1) * 2 - 1
        }
        if (round < 6 && round > 1){
            row = (seed - 1) * (2 ** round) + (2 ** (round - 1))        
        }
        if(round == 6){
            row = seed == 1 ? 16: 16 + 35
        }
        if (round == 7){
            row = 33
        }
        if (region == 'E' || region == 'W'){
            row += 35
        }
        return row + offset

    }

    function findCol(id){
        const round = parseInt(id[0])
        const region = id[1]
        const offset = 0
        if (region == 'S' || region == 'E'){
            return round + offset
        }
        if (region == 'M' || region == 'W'){
            return 12 - round + offset
        }
        if (region == 'F'){
            return 6 + offset
        }
        return null
    }
    
    return(

        
        <div className="bracketGrid">
            {stateKeys.map((key) => {
                
                    let row = findRow(key)
                    let col = findCol(key)
                    return <BracketSlot id={key} team={state[key].team} state={state} teams={props.teams} row={row} column={col}/>
                
            }
            )}

        </div>

    )
}

export default BracketGrid