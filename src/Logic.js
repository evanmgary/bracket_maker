const order = ["2S1", "2S2", "2S3", "2S4", "2S5", "2S6", "2S7", "2S8", "2E1", "2E2", "2E3", "2E4", "2E5", "2E6", "2E7", "2E8","2M1", "2M2", "2M3",
"2M4", "2M5", "2M6", "2M7", "2M8", "2W1", "2W2", "2W3", "2W4", "2W5", "2W6", "2W7", "2W8",
"3S1", "3S2", "3S3", "3S4", "3E1", "3E2", "3E3", "3E4", "3M1", "3M2", "3M3", "3M4", "3W1", "3W2", "3W3", "3W4",
"4S1", "4S2", "4E1", "4E2", "4M1", "4M2", "4W1", "4W2", "5S1", "5E1", "5M1", "5W1", "6F1", "6F2", "7F1"]

function clearBracket(initState, setState){
    setState(initState)
}

function randomizeBracket(state, setState, teams, controls){
    for (let i = 0; i < order.length; i++){
        let currId = order[i]
        if (state[currId].team != null){
            continue
        }
        // pred1team and pred2team are team names, not ids
        let pred1team = state[state[currId].pred1].team
        let pred2team = state[state[currId].pred2].team
        let chance = checkProbability(pred1team, pred2team, teams, controls)
        let randNum = Math.random()
        let result = ""
        if (randNum < chance){
            result = pred1team
        }
        else{
            result = pred2team
        }
        setState(...state, {[currId]: {...state[currId], team: result}})
    }
}

function checkProbability(team1, team2, teams, controls){
    let team1bpi = normalize(teams[team1].b, -5, 20)
    let team2bpi = normalize(teams[team2].b, -5, 20)
    let team1kenpom = normalize(teams[team1].k, -10, 30)
    let team2kenpom = normalize(teams[team2].k, -10, 30)
    let team1sagarin = normalize(teams[team1].s, 60, 100)
    let team2sagarin = normalize(teams[team2].s, 60, 100)
    let team1moore = normalize(teams[team1].m, 65, 105)
    let team2moore = normalize(teams[team2].m, 65, 105)
    return 0.5
}

function normalize(val, min, max){
    return (val - min) / (max - min) * 100
}