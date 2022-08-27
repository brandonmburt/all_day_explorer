export const getNumMomentsBySeriesAndTier = (series, moments) => {

    const myMap = new Map();
    series.forEach(s => {
        const { id, name } = s;
        myMap.set(id, { name, COMMON: 0, RARE: 0, LEGENDARY: 0, ULTIMATE: 0 });
    });

    moments.forEach(m => {
        const { seriesID, tier } = m;
        myMap.get(seriesID)[tier] += 1;
    });

    let data = [];
    myMap.forEach(v => {
        const TOT = v.COMMON + v.RARE + v.LEGENDARY + v.ULTIMATE;
        data.push({TOTAL: TOT, ...v});
    });

    return data;

}

export const getNumEditionsBySeriesAndTier = (series, editionIDs, editionsMap) => {

    const myMap = new Map();
    series.forEach(s => {
        const { id, name } = s;
        myMap.set(id, { name, COMMON: 0, RARE: 0, LEGENDARY: 0, ULTIMATE: 0 });
    });

    editionIDs.forEach(id => {
        const edition = editionsMap.get(id);
        const { seriesID, tier } = edition;
        myMap.get(seriesID)[tier] += 1;
    });

    let data = [];
    myMap.forEach(v => {
        const TOT = v.COMMON + v.RARE + v.LEGENDARY + v.ULTIMATE;
        data.push({TOTAL: TOT, ...v});
    });

    return data;

}

export const getAgMomentsByTypeAndTeam = (collectionMoments, playTypes, teams) => {

    const typesObj = {total: 0};
    playTypes.forEach(type => typesObj[type] = 0);

    const teamObjMap = new Map();
    teams.forEach((v, k) => teamObjMap.set(k, {...typesObj}));

    collectionMoments.forEach(moment => {
        const { teamName, playType, tier } = moment;
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