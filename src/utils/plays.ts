import { generateTeamObjArr, generateTeamObjMapByType } from './general';
import { Play, PlayGridData } from '../models/models';

export const getPlaysGridData = (plays: Map<Number, Play>): PlayGridData[] => {

    let gridData: PlayGridData[] = [];
    plays.forEach((play: Play) => {
        let { id, classification, metadata } = play;
        let { playerPosition, playerFirstName, playerLastName, teamName, playType, gameDate, awayTeamName, homeTeamName } = metadata;
        const gridDataObj: PlayGridData = {
            id,
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
        }
        gridData.push(gridDataObj);
    });
    return gridData;

}

export const getAgPlaysByTypeAndTeam = (plays: Map<Number, Play>, playTypes: string[], teams: Map<string, string>) => {

    const [teamObjMap, typesObj] = generateTeamObjMapByType(playTypes, teams);

    plays.forEach(play => {
        const { metadata } = play;
        const { teamName, playType } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found: " + teamName);
            teamObjMap.set(teamName, { ...typesObj });
        }
        teamObjMap.get(teamName)[playType] += 1;
        teamObjMap.get(teamName).total += 1;
    });

    return generateTeamObjArr(teamObjMap, teams);

}