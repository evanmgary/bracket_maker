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
    let kStyle = {textDecoration: props.controls.useK ? "none" : "line-through"}
    let eStyle = {textDecoration: props.controls.useE ? "none" : "line-through"}
    let tStyle = {textDecoration: props.controls.useT ? "none" : "line-through"}
    let hStyle = {textDecoration: props.controls.useH ? "none" : "line-through"}
    let bStyle = {textDecoration: props.controls.useB ? "none" : "line-through"}
    let mStyle = {textDecoration: props.controls.useM ? "none" : "line-through"}
    let wrStyle = {textDecoration: props.controls.useWR ? "none" : "line-through"}
    let wmStyle = {textDecoration: props.controls.useWM ? "none" : "line-through"}
    let wtStyle = {textDecoration: props.controls.useWT ? "none" : "line-through"}

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
                {props.isMens ? 
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>{`(${teamPred1.seed}) ${teamPred1.name}`}</th>
                            <th>Probability</th>
                            <th>{`(${teamPred2.seed}) ${teamPred2.name}`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="tooltipRow">
                            <td className="bData" style={bStyle}>BPI:</td>
                            <td className="bData" style={bStyle}>{teamPred1.b}</td>
                            <td className="bData" style={bStyle}>{props.checkOneProbability(teamPred1.b, teamPred2.b, "b").toFixed(2)}</td>
                            <td className="bData" style={bStyle}>{teamPred2.b}</td>
                        </tr>
                        <tr className="tooltipRow">
                            <td className="kData" style={kStyle}>KenPom:</td>
                            <td className="kData" style={kStyle}>{teamPred1.k}</td>
                            <td className="kData" style={kStyle}>{props.checkOneProbability(teamPred1.k, teamPred2.k, "k").toFixed(2)}</td>
                            <td className="kData" style={kStyle}>{teamPred2.k}</td>
                        </tr>
                        <tr className="tooltipRow">
                            <td className="eData" style={eStyle}>Evan Miya:</td>
                            <td className="eData" style={eStyle}>{teamPred1.e}</td>
                            <td className="eData" style={eStyle}>{props.checkOneProbability(teamPred1.e, teamPred2.e, "e").toFixed(2)}</td>
                            <td className="eData" style={eStyle}>{teamPred2.e}</td>
                        </tr>
                        <tr className="tooltipRow">
                            <td className="mData" style={mStyle}>Moore:</td>
                            <td className="mData" style={mStyle}>{teamPred1.m}</td>
                            <td className="mData" style={mStyle}>{props.checkOneProbability(teamPred1.m, teamPred2.m, "m").toFixed(2)}</td>
                            <td className="mData" style={mStyle}>{teamPred2.m}</td>
                        </tr>
                        <tr className="tooltipRow">
                            <td className="tData" style={tStyle}>T Rank:</td>
                            <td className="tData" style={tStyle}>{teamPred1.t}</td>
                            <td className="tData" style={tStyle}>{props.checkOneProbability(teamPred1.t, teamPred2.t, "t").toFixed(2)}</td>
                            <td className="tData" style={tStyle}>{teamPred2.t}</td>
                        </tr>
                        <tr className="tooltipRow">
                            <td className="hData" style={hStyle}>Haslam:</td>
                            <td className="hData" style={hStyle}>{teamPred1.h}</td>
                            <td className="bData" style={bStyle}>{props.checkOneProbability(teamPred1.h, teamPred2.h, "h").toFixed(2)}</td>
                            <td className="hData" style={hStyle}>{teamPred2.h}</td>
                        </tr>
                    </tbody>
                    </table>
                    :
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{`(${teamPred1.seed}) ${teamPred1.name}`}</th>
                                <th>Probability</th>
                                <th>{`(${teamPred2.seed}) ${teamPred2.name}`}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tooltipRow">
                                <td className="wrData" style={wrStyle}>RPI:</td>
                                <td className="wrData" style={wrStyle}>{teamPred1.wr}</td>
                                <td className="wrData" style={wrStyle}>{props.checkOneProbability(teamPred1.wr, teamPred2.wr, "wr").toFixed(2)}</td>
                                <td className="wrData" style={wrStyle}>{teamPred2.wr}</td>
                            </tr>
                            <tr className="tooltipRow">
                                <td className="wmData" style={wmStyle}>Advanced:</td>
                                <td className="wmData" style={wmStyle}>{teamPred1.wm}</td>
                                <td className="wmData" style={wmStyle}>{props.checkOneProbability(teamPred1.wm, teamPred2.wm, "wm").toFixed(2)}</td>
                                <td className="wmData" style={wmStyle}>{teamPred2.wm}</td>
                            </tr>
                            <tr className="tooltipRow">
                                <td className="wtData" style={wtStyle}>T-Rank:</td>
                                <td className="wtData" style={wtStyle}>{teamPred1.wt}</td>
                                <td className="wtData" style={wtStyle}>{props.checkOneProbability(teamPred1.wt, teamPred2.wt, "wt").toFixed(2)}</td>
                                <td className="wtData" style={wtStyle}>{teamPred2.wt}</td>
                            </tr>
                        </tbody>
                    </table>
                }
                <div className="tooltipText probabilityText">{teamPred1.name} probability: {props.isMens? props.checkProbability(teamPred1.name, teamPred2.name, props.teams, props.controls).toFixed(2) : props.checkProbabilityW(teamPred1.name, teamPred2.name, props.teams, props.controls).toFixed(2)}</div>
            </div>
        )
    }

    return(
        <div id={props.id} className="bracketSlot" style={slotLoc} onClick={() => props.advanceTeam(props.id, props.state, props.setState, props.teams, props.controls, props.isMens)}> 
            {tooltip()}
            <span className="slotText">{value}</span>
        </div>

    )
}

export default BracketSlot