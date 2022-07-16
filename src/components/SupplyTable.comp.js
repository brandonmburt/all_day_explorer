import React from "react"
import { Container, Row, Col, Table, Card } from "react-bootstrap";

export function SupplyTable(props) {
    
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    {['Series', 'Common', 'Rare', 'Legendary', 'Ultimate', 'Total'].map((header, j) => {
                        return <th key={j}>{header}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {editionTiersPerSeries !== null &&
                    editionTiersPerSeries.map((row, i) => {
                        return (
                        <tr key={i}>
                            {[row.name, row.COMMON, row.RARE, row.LEGENDARY, row.ULTIMATE, row.TOTAL].map((data, j) => {
                                return <td key={j}>{numFormat(data)}</td>
                            })}
                        </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )

}