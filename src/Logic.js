export function clearBracket(initState, setState){
    setState(initState)
}

export function randomizeBracket(state, setState, teams, controls){
    const order = ["2S1", "2S2", "2S3", "2S4", "2S5", "2S6", "2S7", "2S8", "2E1", "2E2", "2E3", "2E4", "2E5", "2E6", "2E7", "2E8","2M1", "2M2", "2M3",
"2M4", "2M5", "2M6", "2M7", "2M8", "2W1", "2W2", "2W3", "2W4", "2W5", "2W6", "2W7", "2W8",
"3S1", "3S2", "3S3", "3S4", "3E1", "3E2", "3E3", "3E4", "3M1", "3M2", "3M3", "3M4", "3W1", "3W2", "3W3", "3W4",
"4S1", "4S2", "4E1", "4E2", "4M1", "4M2", "4W1", "4W2", "5S1", "5E1", "5M1", "5W1", "6F1", "6F2", "7F1"]
    const stateCopy = JSON.parse(JSON.stringify(state))
    for (let i = 0; i < order.length; i++){
        let currId = order[i]
        if (state[currId].team != null){
            continue
        }
        // pred1team and pred2team are team names, not ids
        let pred1team = stateCopy[stateCopy[currId].pred1].team
        let pred2team = stateCopy[stateCopy[currId].pred2].team
        let chance = checkProbability(pred1team, pred2team, teams, controls)
        let randNum = Math.random()
        let result = ""
        if (randNum < chance){
            result = pred1team
        }
        else{
            result = pred2team
        }
        //setState({...state, [currId]: {...state[currId], team: result}})
        stateCopy[currId].team = result
    }
    setState(stateCopy)
}

export function advanceTeam(id, state, setState, teams, controls){
    //This will randomly pick a team to advance from the previous round if a blank slot is clicked, otherwise will advance the team in the slot
    
    if (state[id].team == null){
        

        let pred1team = state[state[id].pred1].team
        let pred2team = state[state[id].pred2].team
        if (!pred1team || !pred2team){
            return
        }
        let chance = checkProbability(pred1team, pred2team, teams, controls)
        let randNum = Math.random()
        let result = ""
        if (randNum < chance){
            result = pred1team
        }
        else{
            result = pred2team
        }
        setState({...state, [id]: {...state[id], team: result}})
    }
    else{
        let succId = state[id].succ
        if (succId) {
            setState({...state, [succId]: {...state[succId], team: state[id].team}})
        }
    }
}

export function checkProbability(team1, team2, teams, controls){
    let team1b = normalize(teams[team1].b, -5, 20)
    let team2b = normalize(teams[team2].b, -5, 20)
    let team1k = normalize(teams[team1].k, -10, 30)
    let team2k = normalize(teams[team2].k, -10, 30)
    let team1s = normalize(teams[team1].e, 60, 100)
    let team2s = normalize(teams[team2].e, 60, 100)
    let team1m = normalize(teams[team1].m, 65, 105)
    let team2m = normalize(teams[team2].m, 65, 105)
    let numIndex = (controls.useB ? 1 : 0) + (controls.useK ? 1 : 0) + (controls.useE ? 1 : 0) + (controls.useM ? 1 : 0)
    if (numIndex < 0.1){
        return 0.5
    }
    let powerRank1 = ((controls.useB ? team1b : 0) + (controls.useK ? team1k : 0) + (controls.useE ? team1s : 0) + (controls.useM ? team1m : 0)) / numIndex
    let powerRank2 = ((controls.useB ? team2b : 0) + (controls.useK ? team2k : 0) + (controls.useE ? team2s : 0) + (controls.useM ? team2m : 0)) / numIndex
    let diff = powerRank1 - powerRank2

    return 0.5 + 0.005 * diff
}

export function normalize(val, min, max){
    return (val - min) / (max - min) * 100
}

