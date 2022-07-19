// TODO: Need to refactor all the functions on this page

export const numPlaysByTypeAndTeam = (plays) => {
    const playTypeByTeam = new Map();

    const playTypeSet = new Set();
    plays.forEach(p => {
        const { metadata } = p;
        let { playType } = metadata;
        if (playType === "") {
            playType = "Team Melt";
        }
        playTypeSet.add(playType);
    });
    let playTypeArr = Array.from(playTypeSet);
    const teamsMap = getTeamAbbreviations();
    let playTypeByTeamTEST = new Map();
    teamsMap.forEach((v, k) => {
        playTypeArr.forEach(type => {
            playTypeByTeamTEST.set((k + ";" + type), {count: 0});
        });
    });

    plays.forEach(play => {
        const { metadata } = play;
        let { teamName, playType } = metadata;
        if (playType === "") {
            playType = "Team Melt";
        }
        const key = teamName + ";" + playType;

        if (!playTypeByTeamTEST.has(key)) {
            playTypeByTeamTEST.set(key, {count: 0});
        }

        playTypeByTeamTEST.get(key).count += 1;
    });

    const teamAbbreviations = getTeamAbbreviations();

    let playObjs = [];
    playTypeByTeamTEST.forEach((v, k) => {
        const [ team, playType ] = k.split(";");
        const abbreviation = teamAbbreviations.has(team) ? teamAbbreviations.get(team) : team;
        playObjs.push({
            team: abbreviation,
            type: playType,
            count: v.count
        });
    });

    console.log(playObjs);

    return playObjs;

}

export const getUniquePlayTypes = (playsByTeam) => {

    const mySet = new Set();

    playsByTeam.forEach(p => mySet.add(p.type));

    console.log(mySet);

    return Array.from(mySet);

}

export const getTeamAbbreviations = () => {

    const myMap = new Map([
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

    return myMap;

}