import React from "react"
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import { usePlays } from "../providers/PlaysProvider.comp";
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Container } from "react-bootstrap";
import { EDITIONS_COLS } from '../config/editions-columns';

export function Editions() {

    const { seriesID, setID } = useParams();

    const { series } = useSeries();
    const { sets } = useSets();
    const { editions } = useEditions();
    const { plays } = usePlays();

    if (!series || !sets || !editions || !plays) {
        return null;
    }

    const gridData = [];

    const filteredEditions = editions.filter(e => {
        return e.seriesID === seriesID && e.setID === setID
    });

    filteredEditions.forEach(e => {
        const { id, playID, tier, numMinted, maxMintSize } = e;
        const play = plays.get(playID);
        if (play != null) {
            gridData.push({
                id,
                tier,
                numMinted,
                maxMintSize,
                ...play
            });
        }
    });

    return (
        <div>
            <Container>
                <DataTable
                    title={series && sets ? series.get(seriesID).name + ": " + sets.get(setID).name : "Waiting"}
                    columns={EDITIONS_COLS}
                    data={gridData}
                    defaultSortFieldId={1}
                    fixedHeader
                    highlightOnHover
                    progressPending={gridData.length === 0}
                    pagination
                />
            </Container>
        </div>
    )

}