import { usePlays } from '../providers/PlaysProvider.comp';
import { Container } from 'react-bootstrap';
import { AG_PLAYS_COLS } from '../constants/ag-grid/plays-columns';
import { getPlaysGridData } from '../utils/plays';
import { AgGrid } from '../components/AgGrid';
import { getAgPlaysByTypeAndTeam } from '../utils/plays';
import { TEAMS } from '../constants/teams';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart';
import { Accordian } from '../components/Accordian';
import { isMobile } from '../utils/general';
import { TeamTable } from '../components/TeamTable';
import { TeamBadge } from '../components/badges/TeamBadge';

export function Plays() {

    const { playsMap, playTypes } = usePlays();

    let rowData = [], playsByTeam = [], playTypeTable = null;
    if (!!playsMap && rowData.length === 0) {
        rowData = getPlaysGridData(playsMap);
        playsByTeam = getAgPlaysByTypeAndTeam(playsMap, playTypes, TEAMS);

        if (isMobile()) {
            playTypeTable = <TeamTable data={playsByTeam} columns={playTypes} />;
        }
    }

    return (
        <Container>
            {!!playsMap && <>
                {playsByTeam.length > 0 && playTypes.length > 0 &&
                    <AgStackedBarChart data={playsByTeam} yKeys={playTypes} title={'Plays Per Team & Type'} mobileTitle={'Plays Per Team'} />
                }
                {isMobile() && !!playTypeTable &&
                    <Accordian items={[['Plays Per Team & Type', playTypeTable]]} />
                }
                {rowData.length > 0 &&
                    <AgGrid components={{ teamRenderer: TeamBadge }} columnDefs={AG_PLAYS_COLS} rowData={rowData} />
                }
            </>}
        </Container>
    )

}