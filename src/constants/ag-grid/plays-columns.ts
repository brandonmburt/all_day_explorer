interface AgPlaysCols {
    headerName: string;
    field: string;
    minWidth?: number;
    sortable?: boolean;
    cellRenderer?: string,
}

export const AG_PLAYS_COLS: AgPlaysCols[] = [
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
        field: 'teamName',
        cellRenderer: 'teamRenderer',
    },
    {
        headerName: 'Opponent',
        field: 'opponent',
        cellRenderer: 'teamRenderer',
    },
    {
        headerName: 'Position',
        field: 'playerPosition',
        minWidth: 100
    },
    {
        headerName: 'Play Type',
        field: 'playType',
    },
    {
        headerName: 'Game Date',
        field: 'gameDate',
        sortable: false
    },
]
