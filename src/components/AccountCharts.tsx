import { useState } from "react"
import { Row, Col, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { TEAMS } from '../constants/teams';
import { getNumMomentsBySeriesAndTier, getNumEditionsBySeriesAndTier, getAgMomentsByTypeAndTeam } from '../utils/account';
import AgStackedBarChart from './ag-charts/StackedBarChart';
import AgPieChart from './ag-charts/PieChart';
import { CardComp } from './Card';
import { SupplyTable } from './SupplyTable';
import { Accordian } from './Accordian';
import { isMobile } from '../utils/general';
import { TeamTable } from './TeamTable';

export function AccountCharts(props) {

    const [radioBtn, setRadioBtn] = useState('1');

    const [momentsBySeriesAndTier] = useState(() => getNumMomentsBySeriesAndTier(props.series, props.collection).filter(x => x.name !== 'Totals'));
    const [editionsBySeriesAndTier] = useState(() => getNumEditionsBySeriesAndTier(props.series, props.editionIDs, props.editionsMap).filter(x => x.name !== 'Totals'));
    const [momentsByTypeAndTeam] = useState(() => getAgMomentsByTypeAndTeam(props.collection, props.playTypes, TEAMS));

    const RADIO_BTNS = [
        { name: 'Moments', value: '1', key: "moments" },
        { name: 'Editions', value: '2', key: "editions" }
    ];

    let playTypeTable = null;
    if (isMobile() && momentsByTypeAndTeam !== null) {
        playTypeTable = <TeamTable data={momentsByTypeAndTeam} columns={props.playTypes} />;
    }

    const createButtons = (type, val, func) => {
        return (
            <ToggleButtonGroup
                size='sm'
                className='toggle-style'
                type='radio'
                name={type + 'Buttons'}
                value={val}
                onChange={(v) => func(v)}>
                {RADIO_BTNS.map((r, id) => (
                    <ToggleButton
                        className='tier-toggle-btn'
                        key={id}
                        id={`${type}-${id}`}
                        variant='outline-secondary'
                        value={r.value}>
                        {r.name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        );
    }

    return (
        <>
            {momentsBySeriesAndTier.length > 0 && editionsBySeriesAndTier.length > 0 &&

                <CardComp mb={'40px'} header={'Series Distribution'} body={
                    <Row>
                        <Col lg={true}>
                            {createButtons('series', radioBtn, setRadioBtn)}
                            <AgPieChart data={radioBtn === '1' ? momentsBySeriesAndTier.map(s => {
                                return { label: s.name, value: s.TOTAL };
                            }) : editionsBySeriesAndTier.map(s => {
                                return { label: s.name, value: s.TOTAL };
                            })
                            } />
                        </Col>
                        <Col lg={true}>
                            <SupplyTable rows={radioBtn === '1' ? momentsBySeriesAndTier : editionsBySeriesAndTier} />
                        </Col>
                    </Row>
                } />
            }
            {momentsByTypeAndTeam.length > 0 &&
                <AgStackedBarChart data={momentsByTypeAndTeam} yKeys={props.playTypes} title={'Moment Distribution'} mobileTitle={'Moment Distribution'} />
            }
            {isMobile() && !!playTypeTable &&
                <Accordian items={[['Moments Per Team & Type', playTypeTable]]} />
            }
        </>
    )

}