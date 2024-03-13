import React from 'react'
import './BracketSlot.css'
// This needs to be a div with inline style gridrow and gridcolumn which are going to be passed as props.

function BracketSlot(props){

    let slotLoc = {gridRow: props.row, gridColumn: props.column}
    const value = props.teams[props.team] ? `(${props.teams[props.team].seed}) ${props.teams[props.team].name}` : ""
    //Get information for the tooltip: need pred1, pred2 for the team, these are state objects
    let pred1 = props.id[0] !== '1' ? props.state[props.state[props.id].pred1] : props.state[props.id]
    let pred2 = props.id[0] !== '1' ? props.state[props.state[props.id].pred2] : props.state[props.id]
    // teamPred1/2 are team objects
    let teamPred1 = pred1.team != null ? props.teams[pred1.team] : null
    let teamPred2 = pred2.team != null ? props.teams[pred2.team] : null
    
    //Make style objects for data in tooltips
    let bStyle = {textDecoration: props.controls.useB ? "none" : "line-through"}
    let kStyle = {textDecoration: props.controls.useK ? "none" : "line-through"}
    let eStyle = {textDecoration: props.controls.useE ? "none" : "line-through"}
    let mStyle = {textDecoration: props.controls.useM ? "none" : "line-through"}

    function tooltip(){
        if (props.id[0] === '1'){
            return null
        }
        if ((!teamPred1) || (!teamPred2)){
            return (
                <div className="tooltipBox">
                    <div className="tooltipText">No two teams to compare.</div>
                </div>
            )
        }
        return (
            <div className="tooltipBox">
                <div className="tooltipText tooltipTeam1">{`(${teamPred1.seed}) ${teamPred1.name}`}</div>
                <div className="tooltipText tooltipTeam1">
                    <span className="bData" style={bStyle}>BPI: {teamPred1.b} </span>
                    <span className="kData" style={kStyle}>Kenpom: {teamPred1.k} </span>
                    <span className="eData" style={eStyle}>EvanMiya: {teamPred1.e} </span>
                    <span className="mData" style={mStyle}>Moore: {teamPred1.m}</span>
                </div>
                <div className="tooltipText tooltipTeam2">{`(${teamPred2.seed}) ${teamPred2.name}`}</div>
                <div className="tooltipText tooltipTeam2">
                    <span className="bData" style={bStyle}>BPI: {teamPred2.b} </span>
                    <span className="kData" style={kStyle}>KenPom: {teamPred2.k} </span>
                    <span className="eData" style={eStyle}>EvanMiya: {teamPred2.e} </span>
                    <span className="mData" style={mStyle}>Moore: {teamPred2.m}</span>
                </div>
                <div className="tooltipText probabilityText">{teamPred1.name} probability: {props.checkProbability(teamPred1.name, teamPred2.name, props.teams, props.controls).toFixed(2)}</div>
            </div>
        )
    }

    return(
        <div id={props.id} className="bracketSlot" style={slotLoc} onClick={() => props.advanceTeam(props.id, props.state, props.setState, props.teams, props.controls)}> 
            {tooltip()}
            <span className="slotText">{value}</span>
        </div>

    )
}

export default BracketSlot