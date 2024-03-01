interface CollectionColumn {
    headerName: string;
    field: string;
    cellRenderer?: string;
}

export const AG_COLLECTION_COLS: CollectionColumn[] = [
    {
        headerName: 'Player',
        field: 'name',
    },
    {
        headerName: 'Team',
        field: 'teamName',
        cellRenderer: 'teamRenderer',
    },
    {
        headerName: 'Position',
        field: 'playerPosition',
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
        headerName: 'Serial Number',
        field: 'serialNumber',
    },
    {
        headerName: 'Play Type',
        field: 'playType',
    }
];