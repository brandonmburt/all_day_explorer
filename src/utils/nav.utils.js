

/*
    GOAL: Determine which Sets have Editions within a Series

    This wont be scalable long term. Brute force for now
*/

export const getSetsWithinSeries = (series, sets, editions) => {

    const myMap = new Map();
    series.forEach(s => {
        let newSet = new Set();
        let id = s.id;
        myMap.set(id, newSet);
    });

    editions.forEach(e => {
        const seriesID = e.seriesID;
        const setID = e.setID;

        const currSet = myMap.get(seriesID);

        // The Set is storing set IDs and Names, as follows: "ID:Name" or "1:Genesis"
        const setName = sets.get(setID).name;
        const setStr = setID.toString() + ":" + setName;

        if (!currSet.has(setStr)) {
            currSet.add(setStr);
        }
    });

    return myMap;
}