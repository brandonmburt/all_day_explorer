import React from "react"
import { Table } from "react-bootstrap";
import { numFormat } from '../utils/num.utils';

export function TeamTable(props) {
    
    return (
        <div style={{maxHeight: "400px", overflowY: "scroll"}}>
        <Table striped bordered hover responsive size="sm" style={{textAlign: 'center'}}>
            <thead>
                <tr>
                    <th>Team</th>
                    {props.columns.map((header, j) => {
                        return <th key={j}>{header}</th>
                    })}
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((row, i) => {
                    return (
                    <tr key={i}>
                        <td><strong>{row.name}</strong></td>
                        {props.columns.map((key, j) => {
                            return <td key={j}>{numFormat(row[key] ?? 0)}</td>
                        })}
                        <td>{numFormat(row.total)}</td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>
    )

}