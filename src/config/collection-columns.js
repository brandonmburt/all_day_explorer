export const COLLECTION_COLS = [
    {
        name: 'Player',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Team',
        selector: row => row.teamName,
        sortable: true,
    },
    {
        name: 'Position',
        selector: row => row.playerPosition,
        sortable: true,
    },
    {
        name: 'Series',
        selector: row => row.series,
        sortable: true,
    },
    {
        name: 'Set',
        selector: row => row.set,
        sortable: true,
    },
    {
        name: 'Tier',
        selector: row => row.tier,
        sortable: true,
    },
    {
        name: 'Serial Number',
        selector: row => +row.serialNumber,
        sortable: true,
    },
    {
        name: 'Play Type',
        selector: row => row.classification === "PLAYER_GAME" ? row.playType : "Team Melt",
        sortable: true,
    }
];