import { getSeriesTiersMap, convertSeriesTiersMapToArr } from './general.utils';

export const getSupplyPerSeriesAndTier = (series, editions, type) => {

    const myMap = getSeriesTiersMap(series);

    if (type === 'moments') {
        editions.forEach(e => {
            const { seriesID, numMinted, tier } = e;
            myMap.get(seriesID)[tier] += +numMinted;
        });
    } else if (type === 'editions') {
        editions.forEach(e => {
            const { seriesID, tier } = e;
            myMap.get(seriesID)[tier] += 1;
        });
    } else {
        console.error("No Type Provided");
        return [];
    }

    return convertSeriesTiersMapToArr(myMap);

}