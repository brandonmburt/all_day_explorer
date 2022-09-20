import { generateTeamObjArr, generateTeamObjMapByType, generateTeamObjMapByTier } from './general.utils';

export const getUniqueEditions = (moments) => {

    const editions = new Set();
    moments.forEach(m => editions.add(m.editionID));
    return Array.from(editions);
    
}

export const getDescriptiveMoments = (moments, editionsMap, playsMap, seriesMap, setsMap) => {
    // Moment objects have id, editionID, and serialNumber (all strings)
    
    let descriptiveMoments = [];
    moments.forEach(m => {
        const { id, editionID, serialNumber } = m;
        const { seriesID, setID, playID, tier } = editionsMap.get(editionID);
        const { classification, metadata } = playsMap.get(playID);
        const { playerFirstName, playerLastName, teamName, playerPosition, playType, gameDate } = metadata;
        const series = seriesMap.get(seriesID);
        const set = setsMap.get(setID);
        descriptiveMoments.push({
            momentID: id,
            editionID,
            seriesID,
            setID,
            series: series.name,
            set: set.name,
            playID,
            serialNumber: +serialNumber,
            tier,
            classification,
            playerFirstName,
            playerLastName,
            name: playerFirstName + " " + playerLastName,
            teamName,
            playerPosition,
            playType,
            gameDate
        });
    });

    return descriptiveMoments;

}

export const getAgNumMomentsByTypeAndTeam = (editions, playsMap, playTypes, teams) => {

    const [teamObjMap, typesObj] = generateTeamObjMapByType(playTypes, teams);

    editions.forEach(edition => {
        const { playID, numMinted } = edition;
        const play = playsMap.get(playID);
        const { metadata } = play; 
        const { teamName, playType } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found: " + teamName);
            teamObjMap.set(teamName, {...typesObj});
        }
        teamObjMap.get(teamName)[playType] += +numMinted;
        teamObjMap.get(teamName).total += +numMinted;
    });

    return generateTeamObjArr(teamObjMap, teams);

}

export const getAgNumMomentsByTierAndTeam = (editions, playsMap, tiers, teams) => {

    const [teamObjMap, tiersObj] = generateTeamObjMapByTier(tiers, teams);

    editions.forEach(edition => {
        const { playID, numMinted, tier } = edition;
        const play = playsMap.get(playID);
        const { metadata } = play; 
        const { teamName } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found: " + teamName);
            teamObjMap.set(teamName, {...tiersObj});
        }
        teamObjMap.get(teamName)[tier] += +numMinted;
        teamObjMap.get(teamName).total += +numMinted;
    });

    return generateTeamObjArr(teamObjMap, teams);

}