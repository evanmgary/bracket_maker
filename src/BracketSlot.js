import React from 'react'
import './BracketSlot.css'
// This needs to be a div with inline style gridrow and gridcolumn which are going to be passed as props.

function BracketSlot(props){

    let slotLoc = {gridRow: props.row, gridColumn: props.column}
    
    
    return(
        <div className="bracketSlot" style={slotLoc}>
            <div>TEST</div>
        </div>

    )
}

export default BracketSlot