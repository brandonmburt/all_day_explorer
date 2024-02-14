import { generateTeamObjArr, generateTeamObjMapByType, generateTeamObjMapByTier } from './general.utils';

export const getEditionGridData = (editions, playsMap) => {

    let gridData = [];
    editions.forEach(edition => {
        const { id, maxMintSize, numMinted, playID, tier, seriesID, setID } = edition;
        const play = playsMap.get(playID);
        if (play != null) {
            gridData.push({
                id: +id,
                tier,
                numMinted,
                maxMintSize,
                seriesID,
                setID,
                player: [play.metadata.playerFirstName, play.metadata.playerLastName].join(' '),
                playType: play.metadata.playType,
                ...play
            });
        }
    });

    return gridData;

}

export const addSeriesAndSetInfo = (gridData, seriesMap, setMap) => {
    return gridData.map(row => {
        const { seriesID, setID } = row;
        const series = seriesMap.get(seriesID).name;
        const set = setMap.get(setID).name;
        return {
            series,
            set,
            ...row
        }
    });
}

export const getAgNumEditionsByTypeAndTeam = (editions, playsMap, playTypes, teams) => {

    const [teamObjMap, typesObj] = generateTeamObjMapByType(playTypes, teams);

    editions.forEach(edition => {
        const { playID } = edition;
        const play = playsMap.get(playID);
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

export const getAgNumEditionsByTierAndTeam = (editions, playsMap, tiers, teams) => {

    const [teamObjMap, tiersObj] = generateTeamObjMapByTier(tiers, teams);

    editions.forEach(edition => {
        const { playID, tier } = edition;
        const play = playsMap.get(playID);
        const { metadata } = play;
        const { teamName } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found: " + teamName);
            teamObjMap.set(teamName, { ...tiersObj });
        }
        teamObjMap.get(teamName)[tier] += 1;
        teamObjMap.get(teamName).total += 1;
    });

    return generateTeamObjArr(teamObjMap, teams);

}