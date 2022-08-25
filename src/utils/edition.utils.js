export const getEditionsMap = (editions) => {

    const myMap = new Map();
    editions.forEach(e => {
        myMap.set(e.id, e);
    });

    return myMap;

}

export const getEditionGridData = (editions, playsMap) => {
    
    let gridData = [];
    editions.forEach(edition => {
        const { id, maxMintSize, numMinted, playID, tier } = edition;
        const play = playsMap.get(playID);
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

export const numEditionsByTypeAndTeam = (editions, playsMap, playTypes, teams) => {

    const playTypeByTeam = new Map();
    teams.forEach((v, k) => {
        playTypes.forEach(type => {
            playTypeByTeam.set((k + ";" + type), { count: 0 });
        });
    });

    editions.forEach(edition => {
        const { playID } = edition;
        const play = playsMap.get(playID);
        const { metadata } = play; 
        const { teamName, playType } = metadata;
        const key = teamName + ";" + playType;
        if (!playTypeByTeam.has(key)) {
            console.error("Unidentified team found");
            playTypeByTeam.set(key, { count: 0 });
        }
        playTypeByTeam.get(key).count += 1;
    });

    let editionObjs = [];
    playTypeByTeam.forEach((v, k) => {
        const [ team, playType ] = k.split(";");
        const abbreviation = teams.has(team) ? teams.get(team) : team;
        editionObjs.push({
            team: abbreviation,
            type: playType,
            count: v.count
        });
    });

    return editionObjs;

}