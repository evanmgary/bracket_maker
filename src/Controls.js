import './Controls.css'

function Controls(props){
    const controlState = props.controls
    const state = props.state

    const handleCheckboxChange = () => {

    }

    const clickRandomize = () => {

    }

    const clickClear = () => {

    }

    return(
        <div className="controlBox">
            <label>
                <input className="controlCheck" id="bpi-check" type="checkbox" checked={controlState.b}/>
                BPI
            </label>
            <label>
                <input className="controlCheck" id="kenpom-check" type="checkbox" checked={controlState.k}/>
                KenPom
            </label>
            <label>
                <input className="controlCheck" id="sagarin-check" type="checkbox" checked={controlState.s}/>
                Sagarin
            </label>
            <label>
                <input className="controlCheck" id="moore-check" type="checkbox" checked={controlState.m}/>
                Moore
            </label>
            <button className="controlButton" id="randomize-button" onClick={clickRandomize}>Randomize</button>
            <button className="controlButton" id="clear-button" onClick={clickClear}>Clear Bracket</button>


        </div>
    )

}


export default Controls