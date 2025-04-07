import './Controls.css'
function Controls(props){

    const controlState = props.controls
    const handleCheckboxChange = (event) => {
        const id = event.target.id
        props.setControls({...controlState, [id]: !controlState[id]})
    }

    const clickRandomize = () => {
        props.randomizeBracket(props.state, props.setState, props.teams, controlState, props.isMens)
    }

    const clickClear = () => {
        props.clearBracket(props.isMens ? props.initState : props.initStateW, props.setState)
    }

    const switchGender = () => {
        const isMens = !props.isMens
        props.setIsMens(isMens)
        props.clearBracket(isMens ? props.initState : props.initStateW, props.setState)
        if (isMens){
            props.setControls({useB: true, useK: true, useE: true, useM: true, useT: true, useH: true, useWR: false, useWM: false, useWT: false})
            props.setTeams(props.teamsM)
        }
        else{
            props.setControls({useB: false, useK: false, useE: false, useM: false, useT: false, useH: false, useWR: true, useWM: true, useWT: true})
            props.setTeams(props.teamsW)
        }
    }

    return(
        <div className="controlBox">
            {props.isMens ?
            <div>
                <label>
                    <input className="controlCheck" id="useB" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useB}/>
                    BPI
                </label>
                <label>
                    <input className="controlCheck" id="useK" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useK}/>
                    KenPom
                </label>
                <label>
                    <input className="controlCheck" id="useE" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useE}/>
                    EvanMiya
                </label>
                <label>
                    <input className="controlCheck" id="useM" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useM}/>
                    Moore
                </label>
                <label>
                    <input className="controlCheck" id="useT" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useT}/>
                    T Rank
                </label>
                <label>
                    <input className="controlCheck" id="useH" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useH}/>
                    Haslam
                </label>
            </div> :
            <div>
                <label>
                    <input className="controlCheck" id="useWR" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useWR}/>
                    RPI
                </label>
                <label>
                    <input className="controlCheck" id="useWM" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useWM}/>
                    Advanced
                </label>
                <label>
                    <input className="controlCheck" id="useWT" type="checkbox" onClick={handleCheckboxChange} checked={controlState.useWT}/>
                    T Rank
                </label>
            </div>
            }           
            <button className="controlButton" id="randomize-button" onClick={clickRandomize} style={{marginLeft: "auto"}}>Randomize</button>
            <button className="controlButton" id="clear-button" onClick={clickClear}>Clear Bracket</button>
            <button className="controlButton" isMens={props.isMens} onClick={switchGender}>{props.isMens ? "Switch to Women" : "Switch to Men"}</button>
            

        </div>
    )

}


export default Controls