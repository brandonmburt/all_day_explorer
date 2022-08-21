// Might want to just combine these functions into one and add a parameter
// for evaluating moments or editions

export const getSupplyPerSeriesAndTier = (series, editions) => {

    const myMap = new Map();
    series.forEach(s => {
        const { id, name } = s;
        myMap.set(id, { name, COMMON: 0, RARE: 0, LEGENDARY: 0, ULTIMATE: 0 });
    });

    editions.forEach(e => {
        const { seriesID, numMinted, tier } = e;
        myMap.get(seriesID)[tier] += +numMinted;
    });

    let data = [];
    myMap.forEach(v => {
        const TOT = v.COMMON + v.RARE + v.LEGENDARY + v.ULTIMATE;
        data.push({TOTAL: TOT, ...v});
    });

    return data;

}

export const getNumEditionsPerSeriesAndTier = (series, editions) => {

    const myMap = new Map();
    series.forEach(s => {
        const { id, name } = s;
        myMap.set(id, { name, COMMON: 0, RARE: 0, LEGENDARY: 0, ULTIMATE: 0 });
    });

    editions.forEach(e => {
        const { seriesID, tier } = e;
        myMap.get(seriesID)[tier] += 1;
    });

    let data = [];
    myMap.forEach(v => {
        const TOT = v.COMMON + v.RARE + v.LEGENDARY + v.ULTIMATE;
        data.push({TOTAL: TOT, ...v});
    });

    return data;

}