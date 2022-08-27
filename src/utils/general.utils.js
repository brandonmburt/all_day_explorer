export const getSeriesTiersMap = (series) => {
    
    const myMap = new Map();
    series.forEach(s => {
        const { id, name } = s;
        myMap.set(id, { name, COMMON: 0, RARE: 0, LEGENDARY: 0, ULTIMATE: 0 });
    });
    return myMap;

}

export const convertSeriesTiersMapToArr = (seriesTiersMap) => {

    let data = [];
    seriesTiersMap.forEach(v => {
        const TOT = v.COMMON + v.RARE + v.LEGENDARY + v.ULTIMATE;
        data.push({TOTAL: TOT, ...v});
    });
    return data;

}

export const generateTeamObjArr = (teamObjMap, teams) => {
    
    let objsArr = [];
    teamObjMap.forEach((v, k) => {
        objsArr.push({
            name: teams.has(k) ? teams.get(k) : k,
            ...v
        });
    });

    return objsArr.sort((a, b) => b.total - a.total);

}

export const generateTeamObjMapByType = (playTypes, teams) => {
    
    const typesObj = {total: 0};
    playTypes.forEach(type => typesObj[type] = 0);

    const teamObjMap = new Map();
    teams.forEach((v, k) => teamObjMap.set(k, {...typesObj}));

    return [teamObjMap, typesObj];

}

export const generateTeamObjMapByTier = (tiers, teams) => {
    
    const tiersObj = {total: 0};
    tiers.forEach(tier => tiersObj[tier] = 0);

    const teamObjMap = new Map();
    teams.forEach((v, k) => teamObjMap.set(k, {...tiersObj}));

    return [teamObjMap, tiersObj];

}