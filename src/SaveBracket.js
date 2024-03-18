import axios from "axios";
import { useState } from "react";
import "./SaveBracket.css"

export default function SaveBracket(props){
    const [saveMode, setSaveMode] = useState(true)
    let name = ""
    const [popupVisible, setPopupVisible] = useState(false)
    const [statusText, setStatusText] = useState("")

    function handleOpenSave(){
        setSaveMode(true)
        setPopupVisible(true)
    }
    function handleOpenRetrieve(){
        setSaveMode(false)
        setPopupVisible(true)
    }
    function handleSaveRetrieve(){
        
        if(name.length < 1){
            setStatusText("Bracket must be named.")
            return
        }
        if (saveMode){
            console.log(name)
            axios.post('http://localhost:4000/brackets',{
                name: name,
                user: "not implemented yet",
                state: saveState()
            })
            .then((response) => {
                setStatusText("Bracket saved.")
            }, (error) => {
                setStatusText(JSON.stringify(error))
            })
        }
        if (!saveMode){
            axios.get('http://localhost:4000/brackets/' + name)
            .then((response) => {
                setStatusText("Bracket retrieved.")
                decodeState(response.data.state)
            }, (error) => {
                setStatusText(JSON.stringify(error))
            })
        }
    }
    function handleUpdate(){
        axios.put('http://localhost:4000/brackets/',{
                name: name,
                user: "not implemented yet",
                state: saveState()
            })
            .then((response) => {
                setStatusText("Bracket saved.")
            }, (error) => {
                setStatusText(JSON.stringify(error))
            })
    }

    function handleClose(){
        setPopupVisible(false)
    }
    function saveState(){
        let arr = []
        for (let key of Object.keys(props.state)){
            if (key[0] !== "1"){
                arr.push({slot: key, team: props.state[key].team})
            }
        }
        return arr
    }
    function decodeState(arr){
        let newState = {}
        for (let key of Object.keys(props.state)){
            if (key[0] === "1"){
                newState[key] = {...props.state[key]}
            }
        }
        for (let obj of arr){
            newState[obj.slot] = {...props.state[obj.slot], id: obj.slot, team: obj.team} 
        }
        console.log(newState)
        props.setState(newState)
    }

    return(
        <div className="saveBracketDiv">
            <div className="saveBracketControls">
                <div className="saveBracketButtons">
                    <button className={"saveButton"} onClick={handleOpenSave}>Save or Update Bracket</button>
                    <button className={"saveButton"} onClick={handleOpenRetrieve}>Retrieve Bracket</button>
                </div>
                
            </div>
            <div className="savePopup" style={{"visibility": popupVisible ? "visible" : "hidden"}}>
                <button className="closeButton" onClick={handleClose} >X</button>
                <input type="text" className="input" placeholder={saveMode ? "Enter your bracket name" : "Enter a saved bracket name"} onChange={(e) => name = e.target.value}/>
                <p id="statusText" className="statusText">{statusText}</p>
                <button className="saveRetrieveButton" onClick={handleSaveRetrieve}>{saveMode ? "Save Bracket" : "Retrieve Bracket"}</button>
                {saveMode && <button className="updateButton" onClick={handleUpdate}>Update Bracket</button>}
            </div>
        </div>
    )
}