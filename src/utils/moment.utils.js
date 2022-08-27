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

    const typesObj = {total: 0};
    playTypes.forEach(type => typesObj[type] = 0);

    const teamObjMap = new Map();
    teams.forEach((v, k) => teamObjMap.set(k, {...typesObj}));

    editions.forEach(edition => {
        const { playID, numMinted } = edition;
        const play = playsMap.get(playID);
        const { metadata } = play; 
        const { teamName, playType } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found");
            teamObjMap.set(teamName, {...typesObj});
        }
        teamObjMap.get(teamName)[playType] += +numMinted;
        teamObjMap.get(teamName).total += +numMinted;
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

export const getAgNumMomentsByTierAndTeam = (editions, playsMap, tiers, teams) => {

    const tiersObj = {total: 0};
    tiers.forEach(tier => tiersObj[tier] = 0);

    const teamObjMap = new Map();
    teams.forEach((v, k) => teamObjMap.set(k, {...tiersObj}));

    editions.forEach(edition => {
        const { playID, numMinted, tier } = edition;
        const play = playsMap.get(playID);
        const { metadata } = play; 
        const { teamName } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found");
            teamObjMap.set(teamName, {...tiersObj});
        }
        teamObjMap.get(teamName)[tier] += +numMinted;
        teamObjMap.get(teamName).total += +numMinted;
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