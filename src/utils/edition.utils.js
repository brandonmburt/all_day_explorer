export const getEditionsMap = (editions) => {

    const myMap = new Map();
    editions.forEach(e => {
        myMap.set(e.id, e);
    });

    return myMap;

}

export const getEditionGridData = (editions, playsMap) => {
    
    let gridData = [];
    editions.forEach(edition => {
        const { id, maxMintSize, numMinted, playID, tier } = edition;
        const play = playsMap.get(playID);
        if (play != null) {
            gridData.push({
                id: +id,
                tier,
                numMinted,
                maxMintSize,
                player: [play.metadata.playerFirstName, play.metadata.playerLastName].join(' '),
                playType: play.metadata.playType,
                ...play
            });
        }
    });

    return gridData;

}

export const getAgNumEditionsByTypeAndTeam = (editions, playsMap, playTypes, teams) => {

    const typesObj = {total: 0};
    playTypes.forEach(type => typesObj[type] = 0);

    const teamObjMap = new Map();
    teams.forEach((v, k) => teamObjMap.set(k, {...typesObj}));

    editions.forEach(edition => {
        const { playID } = edition;
        const play = playsMap.get(playID);
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

export const getAgNumEditionsByTierAndTeam = (editions, playsMap, tiers, teams) => {

    const tiersObj = {total: 0};
    tiers.forEach(type => tiersObj[type] = 0);

    const teamObjMap = new Map();
    teams.forEach((v, k) => teamObjMap.set(k, {...tiersObj}));

    editions.forEach(edition => {
        const { playID, tier } = edition;
        const play = playsMap.get(playID);
        const { metadata } = play; 
        const { teamName } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found");
            teamObjMap.set(teamName, {...tiersObj});
        }
        teamObjMap.get(teamName)[tier] += 1;
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