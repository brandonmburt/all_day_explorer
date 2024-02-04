import { getSeriesTiersMap, convertSeriesTiersMapToArr } from './general.utils';
import { SeriesTiers, Edition, Series } from '../models/models';

export const getSupplyPerSeriesAndTier = (series: Map<number, Series>, editions: Map<number, Edition>, type: string): SeriesTiers[] => {

    const myMap: Map<number, SeriesTiers> = getSeriesTiersMap(series);

    switch (type) {
        case 'moments':
            editions.forEach((e: Edition) => {
                const { seriesID, numMinted, tier } = e;
                myMap.get(seriesID)[tier] += numMinted;
            });
            break;
        case 'editions':
            editions.forEach((e: Edition) => {
                const { seriesID, tier } = e;
                myMap.get(seriesID)[tier] += 1;
            });
            break;
        default:
            console.error("No Type Provided");
            return [];
    }

    return convertSeriesTiersMapToArr(myMap);

}