
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

    return myMap;
}