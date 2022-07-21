import React from "react"
import { Table } from "react-bootstrap";
import { numFormat } from '../utils/num.utils';

export function SupplyTable(props) {

    const headers = ['Series', 'Common', 'Rare', 'Legendary', 'Ultimate', 'Total'];
    
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
                            return <td key={j}>{numFormat(data)}</td>
                        })}
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    )

}