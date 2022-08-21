export const numPlaysByTypeAndTeam = (plays, playTypes, teams) => {
    
    const playTypeByTeam = new Map();
    teams.forEach((v, k) => {
        playTypes.forEach(type => {
            playTypeByTeam.set((k + ";" + type), { count: 0 });
        });
    });

    plays.forEach(play => {
        const { metadata } = play;
        const { teamName, playType } = metadata;
        const key = teamName + ";" + playType;
        if (!playTypeByTeam.has(key)) {
            console.error("Unidentified team found");
            playTypeByTeam.set(key, { count: 0 });
        }
        playTypeByTeam.get(key).count += 1;
    });


    let playObjs = [];
    playTypeByTeam.forEach((v, k) => {
        const [ team, playType ] = k.split(";");
        const abbreviation = teams.has(team) ? teams.get(team) : team;
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