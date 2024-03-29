import { usePlays } from '../providers/PlaysProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { Container } from 'react-bootstrap';
import { TEAMS } from '../constants/teams';
import { TIERS } from '../constants/tiers';
import { getAgNumMomentsByTypeAndTeam, getAgNumMomentsByTierAndTeam } from '../utils/moment';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart';
import { Accordian } from '../components/Accordian';
import { isMobile } from '../utils/general';
import { TeamTable } from '../components/TeamTable';

export function Moments() {

    const { playsMap, playTypes } = usePlays();
    const { editionsMap } = useEditions();

    let momentsByTeamAndType = [], momentsByTeamAndTier = [], playTypeTable = null, tierTable = null;
    if (!!editionsMap && !!playsMap && momentsByTeamAndType.length === 0 && momentsByTeamAndTier.length === 0) {
        momentsByTeamAndType = getAgNumMomentsByTypeAndTeam(editionsMap, playsMap, playTypes, TEAMS);
        momentsByTeamAndTier = getAgNumMomentsByTierAndTeam(editionsMap, playsMap, TIERS, TEAMS);

        if (isMobile()) {
            playTypeTable = <TeamTable data={momentsByTeamAndType} columns={playTypes} />;
            tierTable = <TeamTable data={momentsByTeamAndTier} columns={TIERS} />;
        }
    }

    return (
        <Container>
            {!!editionsMap && <>
                {momentsByTeamAndType.length > 0 && playTypes.length > 0 &&
                    <AgStackedBarChart data={momentsByTeamAndType} yKeys={playTypes} title={'Moments Per Team & Type'} mobileTitle={'Moments Per Team'} />
                }
                {momentsByTeamAndTier.length > 0 && !isMobile() &&
                    <AgStackedBarChart mb={'0px'} data={momentsByTeamAndTier} yKeys={TIERS} title={'Moments Per Team & Tier'} />
                }
                {isMobile() && !!playTypeTable && !!tierTable &&
                    <Accordian items={[['Moments Per Team & Type', playTypeTable], ['Moments Per Team & Tier', tierTable]]} />
                }
            </>}
        </Container>
    )

}