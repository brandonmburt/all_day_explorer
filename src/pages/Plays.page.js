import React from "react"
import { usePlays } from "../providers/PlaysProvider.comp";
import DataTable from 'react-data-table-component';
import { Container } from "react-bootstrap";
import { PLAYS_COLS } from '../config/plays-columns';

export function Plays() {

    const { plays } = usePlays();

    if (!plays) {
        return null;
    }

    const playArr = [];
    plays.forEach(play => playArr.push(play));

    return (
        <Container>
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