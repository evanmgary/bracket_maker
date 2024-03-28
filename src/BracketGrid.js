import React, { useMemo } from 'react'
import './BracketGrid.css'
import BracketSlot from './BracketSlot.js'

function BracketGrid(props){
    let state = props.state
    let stateKeys = Object.keys(state)
    let lines = useMemo(generateLines, [stateKeys])

    function lineDiv(row, col, type){
        const loc = {gridColumn: col, gridRow: row}
        const height = "35"
        const width = "95"
        const halfHeight = Math.floor(parseInt(height) / 2).toString()
        const halfWidth = Math.floor(parseInt(width) / 2).toString()
        if (type === "vertical"){
            return (
                <svg id={row + "x" + col} className="connectorSVG" height={height} width={width} style={loc}>
                    <line x1={halfWidth} x2={halfWidth} y1="0" y2={height} className="svgLine"/>
                </svg>
            )
        }
        else if (type === "horizontal"){
            return (
                <svg id={row + "x" + col} className="connectorSVG" height={height} width={width} style={loc}>
                    <line y1={halfHeight} y2={halfHeight} x1="0" x2={width} className="svgLine"/>
                </svg>
            )
        }
        if (type === "up-right"){
            return (
                <svg id={row + "x" + col} className="connectorSVG" height={height} width={width} style={loc}>
                    <line x1={halfWidth} x2={halfWidth} y1={halfHeight} y2={height} className="svgLine"/>
                    <line x1={halfWidth} x2={width} y1={halfHeight} y2={halfHeight} className="svgLine"/>
                </svg>
            )
        }
        if (type === "up-left"){
            return (
                <svg id={row + "x" + col}className="connectorSVG" height={height} width={width} style={loc}>
                    <line x1={halfWidth} x2={halfWidth} y1={halfHeight} y2={height} className="svgLine"/>
                    <line x1="0" x2={halfWidth} y1={halfHeight} y2={halfHeight} className="svgLine"/>
                </svg>
            )
        }
        if (type === "down-right"){
            return (
                <svg id={row + "x" + col} className="connectorSVG" height={height} width={width} style={loc}>
                    <line x1={halfWidth} x2={halfWidth} y1="0" y2={halfHeight} className="svgLine"/>
                    <line x1={halfWidth} x2={width} y1={halfHeight} y2={halfHeight} className="svgLine"/>
                </svg>
            )
        }
        if (type === "down-left"){
            return (
                <svg id={row + "x" + col} className="connectorSVG" height={height} width={width} style={loc}>
                    <line x1={halfWidth} x2={halfWidth} y1="0" y2={halfHeight} className="svgLine"/>
                    <line x1="0" x2={halfWidth} y1={halfHeight} y2={halfHeight} className="svgLine"/>
                </svg>
            )
        }
    }

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
        if (round === 1){
            row = (firstround.indexOf(seed) + 1) * 2 - 1
        }
        if (round < 6 && round > 1){
            row = (seed - 1) * (2 ** round) + (2 ** (round - 1))        
        }
        if(round === 6){
            row = 33
        }
        if (round === 7){
            row = 33
        }
        if (region === 'W' || region === 'M'){
            row += 35
        }
        return row + offset

    }

    function findCol(id){
        const round = parseInt(id[0])
        const region = id[1]
        const offset = 0
        if (region === 'E' || region === 'W'){
            return (round * 2 - 1) + offset
        }
        if (region === 'M' || region === 'S'){
            return 22 - (round * 2 - 1) + offset
        }
        if (region === 'F'){
            if (round === 6){
                return 11 + offset - (parseInt(id[2]) === 1 ? 2 : -2)
            }
            return 11 + offset
        }
        return null
    }

    function generateLines(){
        let lineSlots = []
        for(let key of stateKeys){
            const round = parseInt(key[0]) - 1
            if (round < 1 || round === 5){
                continue
            }
            let row = findRow(key)
            let col = findCol(key)
            let reverse = 1
            
            if (key[1] === 'M' || key[1] === 'S'){
                reverse = -1
            }
            //lines for finals
            if (round === 6){
                lineSlots.push({loc: [row, col + reverse], type:"horizontal"})
                lineSlots.push({loc: [row, col - reverse], type:"horizontal"})
                break
            }
           
            // Curved lines for rounds 1-4
            if (round >= 1){
                lineSlots.push({loc: [row - (2 ** (round - 1)), col], type: (reverse > 0 ? "up-left": "up-right")})
                lineSlots.push({loc: [row + (2 ** (round - 1)), col], type: (reverse > 0 ? "down-left": "down-right")})
                lineSlots.push({loc: [row - (2 ** (round - 1)), col - reverse], type: "horizontal"})
                lineSlots.push({loc: [row + (2 ** (round - 1)), col - reverse], type: "horizontal"})
            }
            // Vertical lines for later rounds
            if (round >= 2){
                for (let i = 1; i < (2 ** (round - 1)); i++){
                    lineSlots.push({loc: [row - i, col], type:"vertical"})
                    lineSlots.push({loc: [row + i, col], type:"vertical"})
                }
            }
        }
        return lineSlots
    }
    
    return(

        
        <div className="bracketGrid">
            {stateKeys.map((key) => {
                
                    let row = findRow(key)
                    let col = findCol(key)
                    return <BracketSlot id={key} team={state[key].team} state={state} setState={props.setState} teams={props.teams} row={row} column={col} controls={props.controls} advanceTeam={props.advanceTeam} checkProbability={props.checkProbability} checkOneProbability={props.checkOneProbability}/>
                
                })
            }
            {
                lines.map((item) => {
                    return lineDiv(item.loc[0], item.loc[1], item.type)
                })
            }

        </div>

    )
}

export default BracketGrid