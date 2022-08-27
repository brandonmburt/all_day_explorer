import { generateTeamObjArr, generateTeamObjMapByType } from './general.utils';

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

    const [teamObjMap, typesObj] = generateTeamObjMapByType(playTypes, teams);

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

    return generateTeamObjArr(teamObjMap, teams);

}