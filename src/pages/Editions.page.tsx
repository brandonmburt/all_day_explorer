import { usePlays } from '../providers/PlaysProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { Container } from 'react-bootstrap';
import { AG_DETAILED_EDITION_COLS } from '../constants/ag-grid/editions-columns';
import { Loading } from '../components/Loading.comp';
import { AgGrid } from '../components/AgGrid.comp';
import { getAgNumEditionsByTypeAndTeam, getAgNumEditionsByTierAndTeam } from '../utils/edition.utils';
import { TEAMS } from '../constants/teams';
import { getEditionGridData, addSeriesAndSetInfo } from '../utils/edition.utils';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart.comp';
import { TIERS } from '../constants/tiers';
import { Accordian } from '../components/Accordian.comp';
import { isMobile } from '../utils/general.utils';
import { TeamTable } from '../components/TeamTable.comp';

export function Editions() {

    const { playsMap, playTypes } = usePlays();
    const { editionsMap } = useEditions();
    const { series } = useSeries();
    const { sets } = useSets();

    let rowData = [], editionsByTeamAndType = [], editionsByTeamAndTier = [];
    let playTypeTable = null, tierTable = null;
    if (!!editionsMap && !!playsMap && !!series && sets && rowData.length === 0) {
        rowData = addSeriesAndSetInfo(getEditionGridData(editionsMap, playsMap), series, sets);
        editionsByTeamAndType = getAgNumEditionsByTypeAndTeam(editionsMap, playsMap, playTypes, TEAMS);
        editionsByTeamAndTier = getAgNumEditionsByTierAndTeam(editionsMap, playsMap, TIERS, TEAMS);

        if (isMobile()) {
            playTypeTable = <TeamTable data={editionsByTeamAndType} columns={playTypes} />;
            tierTable = <TeamTable data={editionsByTeamAndTier} columns={TIERS} />;
        }
    }

    return (
        <Container>
            {!editionsMap && 
                <Loading />
            }
            {!!editionsMap && <>
                {editionsByTeamAndType.length > 0 && playTypes.length > 0 &&
                    <AgStackedBarChart data={editionsByTeamAndType} yKeys={playTypes} title={'Editions Per Team & Type'} mobileTitle={'Editions Per Team'} />
                }
                {editionsByTeamAndTier.length > 0 && !isMobile() &&
                    <AgStackedBarChart data={editionsByTeamAndTier} yKeys={TIERS} title={'Editions Per Team & Tier'} />
                }
                {isMobile() && !!playTypeTable && !!tierTable &&
                    <Accordian items={[['Editions Per Team & Type', playTypeTable], ['Editions Per Team & Tier', tierTable]]} />
                }
                {rowData.length > 0 &&
                    <AgGrid columnDefs={AG_DETAILED_EDITION_COLS} rowData={rowData} />
                }
            </>}
        </Container>
    )

}