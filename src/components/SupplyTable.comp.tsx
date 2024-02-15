import { Table } from "react-bootstrap";
import { numFormat } from '../utils/num.utils';

export function SupplyTable(props) {

    let rows = [];
    const headers = ['Series', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Ultimate', 'Total'];

    if (props.rows) {
        rows = [...props.rows]
        let totalsRow = { name: "Totals", COMMON: 0, UNCOMMON: 0, RARE: 0, LEGENDARY: 0, ULTIMATE: 0, TOTAL: 0 };

        rows.forEach(row => {
            const { COMMON, UNCOMMON, RARE, LEGENDARY, ULTIMATE } = row;
            const TOT = COMMON + UNCOMMON + RARE + LEGENDARY + ULTIMATE;
            totalsRow.COMMON += COMMON;
            totalsRow.UNCOMMON += UNCOMMON;
            totalsRow.RARE += RARE;
            totalsRow.LEGENDARY += LEGENDARY;
            totalsRow.ULTIMATE += ULTIMATE;
            totalsRow.TOTAL += TOT;
        });

        rows.push(totalsRow);
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
                {rows.map((row, i) => {
                    return (
                        <tr key={i}>
                            {[row.name, row.COMMON, row.UNCOMMON, row.RARE, row.LEGENDARY, row.ULTIMATE, row.TOTAL].map((data, j) => {
                                return i === rows.length - 1 ? <td key={j}><strong>{numFormat(data)}</strong></td> : <td key={j}>{numFormat(data)}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )

}