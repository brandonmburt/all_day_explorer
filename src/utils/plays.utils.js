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

export const getAgPlaysByTypeAndTeam = (plays, playTypes, teams) => {

    const typesObj = {total: 0};
    playTypes.forEach(type => typesObj[type] = 0);

    const teamObjMap = new Map();
    teams.forEach((v, k) => teamObjMap.set(k, {...typesObj}));

    plays.forEach(play => {
        const { metadata } = play;
        const { teamName, playType } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found");
            teamObjMap.set(teamName, {...typesObj});
        }
        teamObjMap.get(teamName)[playType] += 1;
        teamObjMap.get(teamName).total += 1;
    });

    let objsArr = [];
    teamObjMap.forEach((v, k) => {
        objsArr.push({
            name: teams.has(k) ? teams.get(k) : k,
            ...v
        });
    });

    return objsArr.sort((a, b) => b.total - a.total);

}