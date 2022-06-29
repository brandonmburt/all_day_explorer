import React from "react"
import { usePlays } from "../providers/PlaysProvider.comp";
import DataTable from 'react-data-table-component';
import { Container } from "react-bootstrap"

const columns = [
    {
        name: 'ID',
        selector: row => +row.id,
        sortable: true,
    },
    {
        name: 'Player',
        selector: row => [row.metadata.playerFirstName, row.metadata.playerLastName].join(' '),
        sortable: true,
    },
    {
        name: 'Team',
        selector: row => row.metadata.teamName,
        sortable: true,
    },
    {
        name: 'Position',
        selector: row => row.metadata.playerPosition,
        sortable: true,
    },
    {
        name: 'Play Type',
        selector: row => row.classification === "PLAYER_GAME" ? row.metadata.playType : "Team Melt",
        sortable: true,
    },
    {
        name: 'Game Date',
        selector: row => row.metadata.gameDate,
        sortable: true,
    }
];

export function Plays() {

    const { plays } = usePlays();

    const playArr = [];
    plays.forEach(play => playArr.push(play));

    return (
        <Container>
            <DataTable
                title="Plays"
                columns={columns}
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