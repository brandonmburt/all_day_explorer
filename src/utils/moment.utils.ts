import { generateTeamObjArr, generateTeamObjMapByType, generateTeamObjMapByTier } from './general.utils';
import { Moment, DescriptiveMoment, Play, Edition, Series, Set as MySet } from '../models/models';

export const getUniqueEditions = (moments: DescriptiveMoment[]): number[] => {

    const editions = new Set<number>();
    moments.forEach(({ editionID }) => editions.add(editionID));
    return Array.from(editions);

}

export const getDescriptiveMoments = (moments: Moment[], editionsMap: Map<number, Edition>, playsMap: Map<number, Play>, seriesMap: Map<number, Series>, setsMap: Map<number, MySet>): DescriptiveMoment[] => {
    // Moment objects have id, editionID, and serialNumber (all strings)

    let descriptiveMoments: DescriptiveMoment[] = [];
    moments.forEach(m => {
        const { id, editionID, serialNumber } = m;
        const { seriesID, setID, playID, tier } = editionsMap.get(editionID);
        const { classification, metadata } = playsMap.get(playID);
        const { playerFirstName, playerLastName, teamName, playerPosition, playType, gameDate } = metadata;
        const series = seriesMap.get(seriesID);
        const set = setsMap.get(setID);
        descriptiveMoments.push({
            momentID: id,
            editionID,
            seriesID,
            setID,
            series: series.name,
            set: set.name,
            playID,
            serialNumber: serialNumber,
            tier,
            classification,
            playerFirstName,
            playerLastName,
            name: playerFirstName + " " + playerLastName,
            teamName,
            playerPosition,
            playType,
            gameDate
        });
    });

    return descriptiveMoments;

}

export const getAgNumMomentsByTypeAndTeam = (editions: Map<number, Edition>, playsMap: Map<number, Play>, playTypes: string[], teams: Map<string, string>) => {

    const [teamObjMap, typesObj] = generateTeamObjMapByType(playTypes, teams);

    editions.forEach(edition => {
        const { playID, numMinted } = edition;
        const { metadata } = playsMap.get(playID);
        const { teamName, playType } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found: " + teamName);
            teamObjMap.set(teamName, { ...typesObj });
        }
        teamObjMap.get(teamName)[playType] += numMinted;
        teamObjMap.get(teamName).total += numMinted;
    });

    return generateTeamObjArr(teamObjMap, teams);

}

export const getAgNumMomentsByTierAndTeam = (editions: Map<number, Edition>, playsMap: Map<number, Play>, tiers: string[], teams: Map<string, string>) => {

    const [teamObjMap, tiersObj] = generateTeamObjMapByTier(tiers, teams);

    editions.forEach(edition => {
        const { playID, numMinted, tier } = edition;
        const { metadata } = playsMap.get(playID);
        const { teamName } = metadata;
        if (!teamObjMap.has(teamName)) {
            console.error("Unidentified team found: " + teamName);
            teamObjMap.set(teamName, { ...tiersObj });
        }
        teamObjMap.get(teamName)[tier] += numMinted;
        teamObjMap.get(teamName).total += numMinted;
    });

    return generateTeamObjArr(teamObjMap, teams);

}