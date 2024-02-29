import { Series, Set as MySet, Edition } from '../models/models';

export const getSetsWithinSeries = (series: Map<number, Series>, sets: Map<number, MySet>, editions: Map<number, Edition>): [number, string[]][] => {

    const myMap: Map<number, Set<string>> = new Map();
    series.forEach((s: Series) => myMap.set(s.id, new Set<string>()));

    editions.forEach((e: Edition) => {
        const { seriesID, setID } = e;
        // The Set is storing set IDs and their names, as follows: "ID:Name" or "1:Genesis"
        const setStr: string = `${setID}:${sets.get(setID).name}`;
        myMap.get(seriesID).add(setStr);
    });

    return Array.from(myMap).map(([id, setIdAndNames]: [number, Set<string>]) => {
        return [id, Array.from(setIdAndNames).sort((a, b) => +a.split(":")[0] - +b.split(":")[0])];
    });
}