export const getEditionsMap = (editions) => {

    const myMap = new Map();
    editions.forEach(e => {
        myMap.set(e.id, e);
    });

    return myMap;

}

export const getEditionGridData = (editions, plays) => {
    
    let gridData = [];

    editions.forEach(edition => {
        const { id, maxMintSize, numMinted, playID, tier } = edition;
        const play = plays.get(playID);
        if (play != null) {
            gridData.push({
                id: +id,
                tier,
                numMinted,
                maxMintSize,
                player: [play.metadata.playerFirstName, play.metadata.playerLastName].join(' '),
                playType: play.metadata.playType,
                ...play
            });
        }
    });

    return gridData;

}