import { useRef, useState, useMemo } from "react";
import { Row } from "react-bootstrap";
import { AgGridReact } from 'ag-grid-react';
import { DEFAULT_COLS } from '../constants/ag-grid/ag-grid-columns';
import { useTheme } from '../providers/ThemeProvider.comp';

export function AgGrid(props) {

    const { theme } = useTheme();
    const gridRef = useRef(); // Optional - for accessing Grid's API
    let [rowData, setRowData] = useState([]);
    const colDefs = useMemo(() => props.columnDefs, [props.columnDefs]);
    const defaultColDefs = useMemo(() => DEFAULT_COLS, []);

    if (props.rowData !== rowData) {
        setRowData(props.rowData);
    }

    const onGridReady = e => {
        e.api.sizeColumnsToFit();
    }

    return (
        <Row style={{ margin: '0px' }}>
            <div className={theme === 'light' ? 'ag-theme-alpine' : 'ag-theme-alpine-dark'} style={{ height: 600, width: '100%' }}>
                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={rowData}
                    pagination={true}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDefs}
                    animateRows={true}
                    rowSelection='multiple'
                    onGridReady={onGridReady}
                    components={ props.components ?? null }
                />
            </div>
        </Row>
    )

}