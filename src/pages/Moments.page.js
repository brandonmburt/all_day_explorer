import React from "react"
import { usePlays } from "../providers/PlaysProvider.comp";
import { useEditions } from "../providers/EditionsProvider.comp";
import { Container, Row } from "react-bootstrap";
import { Loading } from '../components/Loading.comp';
import { TEAMS } from '../constants/teams';
import { TIERS } from '../constants/tiers';
import { getAgNumMomentsByTypeAndTeam, getAgNumMomentsByTierAndTeam } from '../utils/moment.utils';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart.comp';

export function Moments() {

    const { playsMap, playTypes } = usePlays();
    const { editions } = useEditions();

    let momentsByTeamAndType = [], momentsByTeamAndTier = [];
    if (!!editions && !!playsMap && momentsByTeamAndType.length === 0 && momentsByTeamAndTier.length === 0) {
        momentsByTeamAndType = getAgNumMomentsByTypeAndTeam(editions, playsMap, playTypes, TEAMS);
        momentsByTeamAndTier = getAgNumMomentsByTierAndTeam(editions, playsMap, TIERS, TEAMS);
    }

    return (
        <Container>
            {!editions && 
                <Loading />
            }
            {!!editions &&
                <>
                    {momentsByTeamAndType.length > 0 && playTypes.length > 0 &&
                        <Row style={{height: '600px', marginTop: '30px', marginBottom: '30px'}}>
                            <AgStackedBarChart data={momentsByTeamAndType} yKeys={playTypes} title={'Moments Per Team & Type'} />
                        </Row>
                    }
                    {momentsByTeamAndTier.length > 0 &&
                        <Row style={{height: '600px', marginTop: '30px', marginBottom: '30px'}}>
                            <AgStackedBarChart data={momentsByTeamAndTier} yKeys={TIERS} title={'Moments Per Team & Tier'} />
                        </Row>
                    }
                </>
            }
        </Container>
    )

}