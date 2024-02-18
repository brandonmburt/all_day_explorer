import { Series, Set as MySet, Edition } from '../models/models';

export const getSetsWithinSeries = (series: Map<number, Series>, sets: Map<number, MySet>, editions: Map<number, Edition>): Map<number, Set<string>> => {

    const myMap: Map<number, Set<string>> = new Map();
    series.forEach((s: Series) => myMap.set(s.id, new Set<string>()));

    editions.forEach((e: Edition) => {
        const { seriesID, setID } = e;
        const currSet: Set<string> = myMap.get(seriesID);

        // The Set is storing set IDs and their names, as follows: "ID:Name" or "1:Genesis"
        const setStr: string = `${setID}:${sets.get(setID).name}`;
        currSet.add(setStr);
    });

    return myMap;
}