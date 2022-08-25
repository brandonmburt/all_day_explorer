import React from "react"
import { usePlays } from "../providers/PlaysProvider.comp";
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import { useSeries } from '../providers/SeriesProvider.comp';
import { Container, Row } from "react-bootstrap";
import { AG_EDITION_COLS } from '../constants/ag-grid/editions-columns';
import StackedBarChart from '../components/d3/StackedBarChart.comp';
import { Loading } from '../components/Loading.comp';
import { AgGrid } from '../components/AgGrid.comp';
import { numEditionsByTypeAndTeam } from '../utils/edition.utils';
import { TEAMS } from '../constants/teams';
import { getEditionGridData } from '../utils/edition.utils';

export function Editions() {

    const { playsMap, playTypes } = usePlays();
    const { editions } = useEditions();

    let rowData = [], editionsByTeam = [];
    if (!!editions && !!playsMap && rowData.length === 0) {
        rowData = getEditionGridData(editions, playsMap);
        editionsByTeam = numEditionsByTypeAndTeam(editions, playsMap, playTypes, TEAMS);
    }

    return (
        <Container>
            {!editions && 
                <Loading />
            }
            {!!editions &&
                <>
                    <Row>
                        <h6 style={{margin: '20px 0px 0px 20px'}}>Editions Per Team</h6>
                        {editionsByTeam.length > 0 && playTypes.length > 0 &&
                            <StackedBarChart data={editionsByTeam} types={playTypes} />
                        }
                    </Row>
                    {rowData.length > 0 && 
                        <AgGrid columnDefs={AG_EDITION_COLS} rowData={rowData} />
                    }
                </>
            }
        </Container>
    )

}