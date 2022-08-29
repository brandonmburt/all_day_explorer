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
    const { editionsMap } = useEditions();

    let rowData = [], editionsByTeamAndType = [], editionsByTeamAndTier = [];
    if (!!editionsMap && !!playsMap && rowData.length === 0) {
        rowData = getEditionGridData(editionsMap, playsMap);
        editionsByTeamAndType = getAgNumEditionsByTypeAndTeam(editionsMap, playsMap, playTypes, TEAMS);
        editionsByTeamAndTier = getAgNumEditionsByTierAndTeam(editionsMap, playsMap, TIERS, TEAMS);
    }

    return (
        <Container>
            {!editionsMap && 
                <Loading />
            }
            {!!editionsMap && <>
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