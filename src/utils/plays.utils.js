export const numPlaysByTypeAndTeam = (plays, playTypes) => {
    
    const teamAbbreviations = getTeamAbbreviations();
    const playTypeByTeam = new Map();
    
    teamAbbreviations.forEach((v, k) => {
        playTypes.forEach(type => {
            playTypeByTeam.set((k + ";" + type), {count: 0});
        });
    });

    // Current implementation is looping through plays twice
    plays.forEach(play => {
        const { metadata } = play;
        const { teamName, playType } = metadata;
        const key = teamName + ";" + playType;
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

export const getPlaysGridData = (plays) => {

    let gridData = [];
    plays.forEach(val => {
        let { id, classification, metadata } = val;
        let { playerPosition, playerFirstName, playerLastName, teamName, playType, gameDate, awayTeamName, homeTeamName } = metadata;
        gridData.push({
            id: +id,
            classification,
            playerPosition,
            playerFirstName,
            playerLastName,
            teamName,
            opponent: homeTeamName === teamName ? awayTeamName : homeTeamName,
            homeGame: homeTeamName === teamName ? 'Yes' : 'No',
            playType,
            gameDate,
            player: [playerFirstName, playerLastName].join(' ')
        })
    });
    return gridData;

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
        ["Tennessee Oilers", "OIL"],
        ["Oakland Raiders", "OAK"],
        ["Los Angeles Raiders", "RAI"]
    ]);

}