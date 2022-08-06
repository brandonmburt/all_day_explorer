export const getUniqueEditions = (moments) => {

    const editions = new Set();
    moments.forEach(m => {
        editions.add(m.editionID);
    });
    return Array.from(editions);
    
}

export const getDescriptiveMoments = (moments, editionsMap, playsMap, seriesMap, setsMap) => {
    // Moment objects have id, editionID, and serialNumber (all strings)
    
    let descriptiveMoments = [];
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
            serialNumber,
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