export const EDITIONS_COLS = [
    {
        name: 'Edition ID',
        selector: row => +row.id,
        sortable: true,
    },
    {
        name: 'Player',
        selector: row => [row.metadata.playerFirstName, row.metadata.playerLastName].join(' '),
        sortable: true,
    },
    {
        name: 'Team',
        selector: row => row.metadata.teamName,
        sortable: true,
    },
    {
        name: 'Position',
        selector: row => row.metadata.playerPosition,
        sortable: true,
    },
    {
        name: 'Play Type',
        selector: row => row.classification === "PLAYER_GAME" ? row.metadata.playType : "Team Melt",
        sortable: true,
    },
    {
        name: 'Tier',
        selector: row => row.tier,
        sortable: true,
    },
    {
        name: 'Num Minted',
        selector: row => row.numMinted,
        sortable: true,
    },
    {
        name: 'Max Mint Size',
        selector: row => row.maxMintSize,
        sortable: true,
    }
];