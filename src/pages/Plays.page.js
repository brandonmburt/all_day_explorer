import React from "react"
import { usePlays } from "../providers/PlaysProvider.comp";
import DataTable from 'react-data-table-component';
import { Container, Row } from "react-bootstrap";
import { PLAYS_COLS } from '../config/plays-columns';
import StackedBarChart from '../components/StackedBarChart.comp';

export function Plays() {

    const { plays } = usePlays();

    const playArr = [];
    if (!!plays) {
        plays.forEach(play => playArr.push(play));
    }

    return (
        <Container>
            {plays !== null &&
                <Row>
                    <h6 style={{margin: '20px 0px 0px 20px'}}>Plays Per Team</h6>
                    <StackedBarChart plays={plays} />
                </Row>
            }
            <DataTable
                title="Plays"
                columns={PLAYS_COLS}
                data={playArr}
                defaultSortFieldId={1}
                fixedHeader
                highlightOnHover
                progressPending={playArr.length === 0}
                pagination
            />
        </Container>
    )

}