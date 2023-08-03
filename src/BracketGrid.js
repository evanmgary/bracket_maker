import React from 'react'
import './BracketGrid.css'

function BracketGrid(props){
    
    return(
        <div className="bracketGrid">
            <div style={{border: 1, borderColor: 'red',backgroundColor: 'green' ,gridColumn: 2, gridRow: 2}}>TEST</div>


        </div>

    )
}

export default BracketGrid