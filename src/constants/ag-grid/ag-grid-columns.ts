interface IColDef {
    filter: boolean;
    sortable: boolean;
    minWidth: number;
    resizable: boolean;
    suppressMovable: boolean;
    filterParams: {
        buttons: string[];
        closeOnApply: boolean;
    };
}

export const DEFAULT_COLS: IColDef = {
    filter: true,
    sortable: true,
    minWidth: 150,
    resizable: true,
    suppressMovable: true,
    filterParams: {
        buttons: ['clear'],
        closeOnApply: true
    }
};