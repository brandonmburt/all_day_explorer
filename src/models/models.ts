export interface Moment {
    editionID: number;
    id: number;
    mintingDate: number;
    serialNumber: number;
    uuid: number;
}

export interface DescriptiveMoment {
    momentID: number;
    editionID: number;
    seriesID: number;
    setID: number;
    series: string;
    set: string;
    playID: number;
    serialNumber: number;
    tier: string;
    classification: string;
    playerFirstName: string;
    playerLastName: string;
    name: string;
    teamName: string;
    playerPosition: string;
    playType: string;
    gameDate: string;
}

// TODO: this isn't a good solution, but it works for now
export interface TeamObj {
    [key: string]: number | string; // Allow any other field with numeric values
    name: string;
    total?: number;
  }

export interface SeriesTiers {
    name: string,
    COMMON: number,
    RARE: number,
    LEGENDARY: number,
    ULTIMATE: number,
    TOTAL?: number
}

export interface PlayGridData {
    id: number,
    classification: string,
    playerPosition: string,
    playerFirstName: string,
    playerLastName: string,
    teamName: string,
    opponent: string,
    homeGame: string,
    playType: string,
    gameDate: string,
    player: string

}

export interface Edition {
    id: number,
    maxMintSize: number,
    numMinted: number,
    playID: number,
    seriesID: number,
    setID: number,
    tier: string
}

export interface Play {
    id: number,
    classification: string,
    metadata: {
      awayTeamName: string,
      awayTeamScore: number,
      description: string,
      gameDate: string,
      homeTeamName: string,
      homeTeamScore: number,
      playType: string,
      playerFirstName: string,
      playerLastName: string,
      playerNumber: number,
      playerPosition: string,
      teamName: string
    }
}

export interface Series {
    id: number,
    active: boolean,
    name: string
}

export interface Set {
    id: number,
    name: string,
    setPlaysInEditions: Record<number, boolean> // TODO: Temporary
}