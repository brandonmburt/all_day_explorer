export const getSetsWithinSeries = (series, sets, editions) => {

    const myMap = new Map();
    series.forEach(s => myMap.set(s.id, new Set()));

    editions.forEach(e => {
        const { seriesID, setID } = e;
        const currSet = myMap.get(seriesID);

        // The Set is storing set IDs and Names, as follows: "ID:Name" or "1:Genesis"
        const setStr = setID.toString() + ":" + sets.get(setID).name;
        currSet.add(setStr);
    });

    return myMap;
}