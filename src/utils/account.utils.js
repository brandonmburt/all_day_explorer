export const getNumMomentsBySeriesAndTier = (series, moments) => {

    const myMap = new Map();
    series.forEach(s => {
        let id = s.id;
        let name = s.name;
        myMap.set(id, {
            name,
            COMMON: 0,
            RARE: 0,
            LEGENDARY: 0,
            ULTIMATE: 0
        });
    });

    moments.forEach(m => {
        const { seriesID, tier } = m;
        myMap.get(seriesID)[tier] += 1;
    });

    let data = [];
    myMap.forEach(val => {
        const { COMMON, RARE, LEGENDARY, ULTIMATE } = val;
        const TOT = COMMON + RARE + LEGENDARY + ULTIMATE;
        data.push({TOTAL: TOT, ...val});
    });

    return data;

}

export const getNumEditionsBySeriesAndTier = (series, editionIDs, editionsMap) => {

    const myMap = new Map();
    series.forEach(s => {
        let id = s.id;
        let name = s.name;
        myMap.set(id, {
            name,
            COMMON: 0,
            RARE: 0,
            LEGENDARY: 0,
            ULTIMATE: 0
        });
    });

    editionIDs.forEach(id => {
        const edition = editionsMap.get(id);
        const { seriesID, tier } = edition;
        myMap.get(seriesID)[tier] += 1;
    });

    let data = [];
    myMap.forEach(val => {
        const { COMMON, RARE, LEGENDARY, ULTIMATE } = val;
        const TOT = COMMON + RARE + LEGENDARY + ULTIMATE;
        data.push({TOTAL: TOT, ...val});
    });

    return data;

}