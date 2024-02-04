interface AgPlaysCols {
    headerName: string;
    field: string;
    minWidth?: number;
    sortable?: boolean;
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
    },
    {
        headerName: 'Opponent',
        field: 'opponent',
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
