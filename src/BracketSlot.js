import React from 'react'
import './BracketSlot.css'
// This needs to be a div with inline style gridrow and gridcolumn which are going to be passed as props.

function BracketSlot(props){

    let slotLoc = {gridRow: props.row, gridColumn: props.column}
    const value = props.teams[props.team] ? `(${props.teams[props.team].seed}) ${props.teams[props.team].name}` : ""
    
    return(
        <div id={props.id} className="bracketSlot" style={slotLoc}>
            <span className="slotText">{props.id + " " + value}</span>
        </div>

    )
}

export default BracketSlot