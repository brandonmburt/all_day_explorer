import React from "react"
import { Table } from "react-bootstrap";
import { numFormat } from '../utils/num.utils';

export function SupplyTable(props) {

    const headers = ['Series', 'Common', 'Rare', 'Legendary', 'Ultimate', 'Total'];

    if (props.rows) {
        let totalsRow = { name: "Totals", COMMON: 0, RARE: 0, LEGENDARY: 0, ULTIMATE: 0, TOTAL: 0 };
        
        props.rows.forEach(row => {
            const { COMMON, RARE, LEGENDARY, ULTIMATE } = row;
            const TOT = COMMON + RARE + LEGENDARY + ULTIMATE;    
            totalsRow.COMMON += COMMON;
            totalsRow.RARE += RARE;
            totalsRow.LEGENDARY += LEGENDARY;
            totalsRow.ULTIMATE += ULTIMATE;
            totalsRow.TOTAL += TOT;
        });
        
        props.rows.push(totalsRow);
    }
    
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    {headers.map((header, j) => {
                        return <th key={j}>{header}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {props.rows.map((row, i) => {
                    return (
                    <tr key={i}>
                        {[row.name, row.COMMON, row.RARE, row.LEGENDARY, row.ULTIMATE, row.TOTAL].map((data, j) => {
                            return i === props.rows.length-1 ? <td key={j}><strong>{numFormat(data)}</strong></td> : <td key={j}>{numFormat(data)}</td>
                        })}
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    )

}