import './Controls.css'

function Controls(props){

    const controlState = props.controls
    const handleCheckboxChange = (event) => {
        const id = event.target.id
        props.setControls({...controlState, [id]: !controlState[id]})
    }

    const clickRandomize = () => {
        props.randomizeBracket(props.state, props.setState, props.teams, controlState)
    }

    const clickClear = () => {
        props.clearBracket(props.initState, props.setState)
    }

    return(
        <div className="controlBox">
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
            <button className="controlButton" id="randomize-button" onClick={clickRandomize}>Randomize</button>
            <button className="controlButton" id="clear-button" onClick={clickClear}>Clear Bracket</button>


        </div>
    )

}


export default Controls