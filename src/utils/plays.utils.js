export const numPlaysByTypeAndTeam = (plays) => {
    
    const teamAbbreviations = getTeamAbbreviations();
    const playTypeArr = getPlayTypeArray(plays);
    const playTypeByTeam = new Map();
    
    teamAbbreviations.forEach((v, k) => {
        playTypeArr.forEach(type => {
            playTypeByTeam.set((k + ";" + type), {count: 0});
        });
    });

    // Current implementation is looping through plays twice
    plays.forEach(play => {
        const { metadata } = play;
        const { teamName, playType } = metadata;
        const key = teamName + ";" + (playType === "" ? "Team Melt" : playType);
        if (!playTypeByTeam.has(key)) {
            // this condition should never be met
            playTypeByTeam.set(key, {count: 0});
        }
        playTypeByTeam.get(key).count += 1;
    });


    let playObjs = [];
    playTypeByTeam.forEach((v, k) => {
        const [ team, playType ] = k.split(";");
        const abbreviation = teamAbbreviations.has(team) ? teamAbbreviations.get(team) : team;
        playObjs.push({
            team: abbreviation,
            type: playType,
            count: v.count
        });
    });

    return playObjs;

}

const getPlayTypeArray = (plays) => {

    const playTypeSet = new Set();
    plays.forEach(p => {
        const { metadata } = p;
        let { playType } = metadata;
        playTypeSet.add(playType === "" ? "Team Melt" : playType);
    });
    return Array.from(playTypeSet);
    
}

export const getUniquePlayTypes = (playsByTeam) => {

    const mySet = new Set();
    playsByTeam.forEach(p => mySet.add(p.type));
    return Array.from(mySet);

}

export const getTeamAbbreviations = () => {

    return new Map([
        ["Arizona Cardinals", "ARI"],
        ["Los Angeles Rams", "LAR"],
        ["Kansas City Chiefs", "KC"],
        ["Cincinnati Bengals", "CIN"],
        ["Green Bay Packers", "GB"],
        ["San Francisco 49ers", "SF"],
        ["Tampa Bay Buccaneers", "TB"],
        ["Buffalo Bills", "BUF"],
        ["Dallas Cowboys", "DAL"],
        ["Los Angeles Chargers", "LAC"],
        ["Pittsburgh Steelers", "PIT"],
        ["Denver Broncos", "DEN"],
        ["Miami Dolphins", "MIA"],
        ["Minnesota Vikings", "MIN"],
        ["Chicago Bears", "CHI"],
        ["Detroit Lions", "DET"],
        ["Atlanta Falcons", "ATL"],
        ["Philadelphia Eagles", "PHI"],
        ["Seattle Seahawks", "SEA"],
        ["New England Patriots", "NE"],
        ["Indianapolis Colts", "IND"],
        ["Las Vegas Raiders", "LV"],
        ["Washington Football Team", "WFT"],
        ["New York Jets", "NYJ"],
        ["New Orleans Saints", "NO"],
        ["Baltimore Ravens", "BAL"],
        ["Jacksonville Jaguars", "JAX"],
        ["New York Giants", "NYG"],
        ["Tennessee Titans", "TEN"],
        ["Cleveland Browns", "CLE"],
        ["Houston Texans", "HOU"],
        ["Carolina Panthers", "CAR"],
        ["Phoenix Cardinals", "PHX"],
        ["Tennessee Oilers", "OIL"]
    ]);

}