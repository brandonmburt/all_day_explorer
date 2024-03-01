interface AgEditionCols {
    headerName: string;
    field: string;
    minWidth?: number;
    sortable?: boolean;
    cellRenderer?: string,
}

interface AgDetailedEditionCols {
    headerName: string;
    field: string;
    minWidth?: number;
    sortable?: boolean;
    cellRenderer?: string,
}

export const AG_EDITION_COLS: AgEditionCols[] = [
    {
        headerName: 'ID',
        field: 'id',
        minWidth: 85
    },
    {
        headerName: 'Player',
        field: 'player',
    },
    {
        headerName: 'Team',
        field: 'metadata.teamName',
        cellRenderer: 'teamRenderer',
    },
    {
        headerName: 'Position',
        field: 'metadata.playerPosition',
    },
    {
        headerName: 'Play Type',
        field: 'playType',
    },
    {
        headerName: 'Tier',
        field: 'tier',
    },
    {
        headerName: 'Minted Moments',
        field: 'numMinted',
        minWidth: 180
    },
    {
        headerName: 'Max Mint Size',
        field: 'maxMintSize',
    },
]

export const AG_DETAILED_EDITION_COLS: AgDetailedEditionCols[] = [
    {
        headerName: 'ID',
        field: 'id',
        minWidth: 85
    },
    {
        headerName: 'Player',
        field: 'player',
    },
    {
        headerName: 'Team',
        field: 'metadata.teamName',
        cellRenderer: 'teamRenderer',
    },
    {
        headerName: 'Position',
        field: 'metadata.playerPosition',
    },
    {
        headerName: 'Play Type',
        field: 'playType',
    },
    {
        headerName: 'Series',
        field: 'series',
    },
    {
        headerName: 'Set',
        field: 'set',
    },
    {
        headerName: 'Tier',
        field: 'tier',
    },
    {
        headerName: 'Minted Moments',
        field: 'numMinted',
        minWidth: 180
    },
    {
        headerName: 'Max Mint Size',
        field: 'maxMintSize',
    },
]
