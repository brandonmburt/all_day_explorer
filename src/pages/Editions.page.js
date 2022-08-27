import React from 'react';
import { usePlays } from '../providers/PlaysProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { Container, Row } from 'react-bootstrap';
import { AG_EDITION_COLS } from '../constants/ag-grid/editions-columns';
import { Loading } from '../components/Loading.comp';
import { AgGrid } from '../components/AgGrid.comp';
import { getAgNumEditionsByTypeAndTeam, getAgNumEditionsByTierAndTeam } from '../utils/edition.utils';
import { TEAMS } from '../constants/teams';
import { getEditionGridData } from '../utils/edition.utils';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart.comp';
import { TIERS } from '../constants/tiers';

export function Editions() {

    const { playsMap, playTypes } = usePlays();
    const { editions } = useEditions();

    let rowData = [], editionsByTeamAndType = [], editionsByTeamAndTier = [];
    if (!!editions && !!playsMap && rowData.length === 0) {
        rowData = getEditionGridData(editions, playsMap);
        editionsByTeamAndType = getAgNumEditionsByTypeAndTeam(editions, playsMap, playTypes, TEAMS);
        editionsByTeamAndTier = getAgNumEditionsByTierAndTeam(editions, playsMap, TIERS, TEAMS);
    }

    return (
        <Container>
            {!editions && 
                <Loading />
            }
            {!!editions && <>
                {editionsByTeamAndType.length > 0 && playTypes.length > 0 &&
                    <Row className='bar-chart-container'>
                        <AgStackedBarChart data={editionsByTeamAndType} yKeys={playTypes} title={'Editions Per Team & Type'} />
                    </Row>
                }
                {editionsByTeamAndTier.length > 0 &&
                    <Row className='bar-chart-container'>
                        <AgStackedBarChart data={editionsByTeamAndTier} yKeys={TIERS} title={'Editions Per Team & Tier'} />
                    </Row>
                }
                {rowData.length > 0 && 
                    <AgGrid columnDefs={AG_EDITION_COLS} rowData={rowData} />
                }
            </>}
        </Container>
    )

}