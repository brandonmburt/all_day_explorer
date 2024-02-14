import {
    getSeriesTiersMap, convertSeriesTiersMapToArr, generateTeamObjArr,
    generateTeamObjMapByType
} from './general.utils';

export const getNumMomentsBySeriesAndTier = (series, moments) => {

    const myMap = getSeriesTiersMap(series);

    moments.forEach(m => {
        const { seriesID, tier } = m;
        myMap.get(seriesID)[tier] += 1;
    });

    return convertSeriesTiersMapToArr(myMap);

}

export const getNumEditionsBySeriesAndTier = (series, editionIDs, editionsMap) => {

    const myMap = getSeriesTiersMap(series);

    editionIDs.forEach(id => {
        const edition = editionsMap.get(id);
        const { seriesID, tier } = edition;
        myMap.get(seriesID)[tier] += 1;
    });

    return convertSeriesTiersMapToArr(myMap);

}

export const getAgMomentsByTypeAndTeam = (collectionMoments, playTypes, teams) => {

    const [teamObjMap, typesObj] = generateTeamObjMapByType(playTypes, teams);

    collectionMoments.forEach(moment => {
        const { teamName, playType } = moment;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found: " + teamName);
            teamObjMap.set(teamName, { ...typesObj });
        }
        teamObjMap.get(teamName)[playType] += 1;
        teamObjMap.get(teamName).total += 1;
    });

    return generateTeamObjArr(teamObjMap, teams);

}