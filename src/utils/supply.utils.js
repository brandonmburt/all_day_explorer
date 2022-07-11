
export const getSupplyPerSeries = (series, editions) => {

    const myMap = new Map();
    series.forEach(s => {
        let id = s.id;
        let name = s.name;
        myMap.set(id, {name, count: 0});
    });

    editions.forEach(e => {
        const seriesID = e.seriesID;
        const numMinted = e.numMinted;
        myMap.get(seriesID).count += +numMinted;
    });

    let data = [];
    myMap.forEach(val => data.push({name: val.name, value: val.count}) );
    return data;

}

export const getSupplyPerTier = (editions) => {

    const myMap = new Map();
    editions.forEach(e => {
        const { tier, numMinted } = e;
        if (!myMap.has(tier)) {
            myMap.set(tier, {count: +numMinted });
        } else {
            myMap.get(tier).count += +numMinted;
        }
    });

    let data = [];
    myMap.forEach((val, key) => data.push({name: key, value: val.count}) );
    return data;

}

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
        const tot = val.COMMON + val.RARE + val.LEGENDARY + val.ULTIMATE;
        data.push({TOTAL: tot, ...val});
    });

    // console.log(data);

    return data;

}

export const getNumEditionsPerSeries = (series, editions) => {

    const myMap = new Map();
    series.forEach(s => {
        let id = s.id;
        let name = s.name;
        myMap.set(id, {name, count: 0});
    });

    editions.forEach(e => {
        const seriesID = e.seriesID;
        myMap.get(seriesID).count += 1;
    });

    let data = [];
    myMap.forEach(val => data.push({name: val.name, value: val.count}) );

    // console.log(data);

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
        const tot = val.COMMON + val.RARE + val.LEGENDARY + val.ULTIMATE;
        data.push({TOTAL: tot, ...val});
    });

    console.log(data);

    return data;

}