export const getSupplyPerSeriesAndTier = (series, editions) => {

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

    editions.forEach(e => {
        const { seriesID, numMinted, tier } = e;
        myMap.get(seriesID)[tier] += +numMinted;
    });

    let data = [];
    myMap.forEach(val => {
        const { COMMON, RARE, LEGENDARY, ULTIMATE } = val;
        const TOT = COMMON + RARE + LEGENDARY + ULTIMATE;
        data.push({TOTAL: TOT, ...val});
    });

    return data;

}

export const getNumEditionsPerSeriesAndTier = (series, editions) => {

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

    editions.forEach(e => {
        const { seriesID, tier } = e;
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