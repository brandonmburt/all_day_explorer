import { getTeamAbbreviations } from './plays.utils';

export const getNumMomentsBySeriesAndTier = (series, moments) => {

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

    moments.forEach(m => {
        const { seriesID, tier } = m;
        myMap.get(seriesID)[tier] += 1;
    });

    let data = [];
    myMap.forEach(val => {
        const { COMMON, RARE, LEGENDARY, ULTIMATE } = val;
        const TOT = COMMON + RARE + LEGENDARY + ULTIMATE;
        data.push({TOTAL: TOT, ...val});
    });

    return data;

}

export const getNumEditionsBySeriesAndTier = (series, editionIDs, editionsMap) => {

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

    editionIDs.forEach(id => {
        const edition = editionsMap.get(id);
        const { seriesID, tier } = edition;
        myMap.get(seriesID)[tier] += 1;
    });

    let data = [];
    myMap.forEach(val => {
        const { COMMON, RARE, LEGENDARY, ULTIMATE } = val;
        const TOT = COMMON + RARE + LEGENDARY + ULTIMATE;
        data.push({TOTAL: TOT, ...val});
    });

    return data;

}

export const numMomentsByTypeAndTeam = (collectionMoments, playTypes) => {
    const teamAbbreviations = getTeamAbbreviations();
    const playTypeByTeam = new Map();
    
    teamAbbreviations.forEach((v, k) => {
        playTypes.forEach(type => {
            playTypeByTeam.set((k + ";" + type), {count: 0});
        });
    });

    // Current implementation is looping through plays twice
    collectionMoments.forEach(moment => {
        const { teamName, playType, tier } = moment;
        const key = teamName + ";" + playType;
        if (!playTypeByTeam.has(key)) {
            // this condition should never be met
            playTypeByTeam.set(key, {count: 0});
        }
        playTypeByTeam.get(key).count += 1;
    });


    let playObjs = [];
    playTypeByTeam.forEach((v, k) => {
        const [ team, playType ] = k.split(";");
        const abbreviation = teamAbbreviations.has(team) ? teamAbbreviations.get(team) : team;
        playObjs.push({
            team: abbreviation,
            type: playType,
            count: v.count
        });
    });

    // console.log(playObjs)
    return playObjs;

}