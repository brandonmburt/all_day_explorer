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

export const numMomentsByTypeAndTeam = (collectionMoments, playTypes, teams) => {

    const playTypeByTeam = new Map();
    teams.forEach((v, k) => {
        playTypes.forEach(type => {
            playTypeByTeam.set((k + ";" + type), { count: 0 });
        });
    });

    collectionMoments.forEach(moment => {
        const { teamName, playType, tier } = moment;
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