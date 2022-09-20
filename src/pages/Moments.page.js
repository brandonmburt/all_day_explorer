import React from 'react';
import { usePlays } from '../providers/PlaysProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { Container, Row } from 'react-bootstrap';
import { Loading } from '../components/Loading.comp';
import { TEAMS } from '../constants/teams';
import { TIERS } from '../constants/tiers';
import { getAgNumMomentsByTypeAndTeam, getAgNumMomentsByTierAndTeam } from '../utils/moment.utils';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart.comp';
import { isMobile } from '../utils/general.utils';

export function Moments() {

    const { playsMap, playTypes } = usePlays();
    const { editionsMap } = useEditions();

    let momentsByTeamAndType = [], momentsByTeamAndTier = [];
    if (!!editionsMap && !!playsMap && momentsByTeamAndType.length === 0 && momentsByTeamAndTier.length === 0) {
        momentsByTeamAndType = getAgNumMomentsByTypeAndTeam(editionsMap, playsMap, playTypes, TEAMS);
        momentsByTeamAndTier = getAgNumMomentsByTierAndTeam(editionsMap, playsMap, TIERS, TEAMS);
    }

    return (
        <Container>
            {!editionsMap && 
                <Loading />
            }
            {!!editionsMap && <>
                {momentsByTeamAndType.length > 0 && playTypes.length > 0 &&
                        <AgStackedBarChart data={momentsByTeamAndType} yKeys={playTypes} title={'Moments Per Team & Type'} mobileTitle={'Moments Per Team'} />
                }
                {momentsByTeamAndTier.length > 0 && !isMobile() &&
                        <AgStackedBarChart data={momentsByTeamAndTier} yKeys={TIERS} title={'Moments Per Team & Tier'} />
                }
            </>}
        </Container>
    )

}