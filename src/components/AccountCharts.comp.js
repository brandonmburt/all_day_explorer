import React, { useState } from "react"
import { Row, Col } from "react-bootstrap";
import { TEAMS } from '../constants/teams';
import { getNumMomentsBySeriesAndTier, getNumEditionsBySeriesAndTier, getAgMomentsByTypeAndTeam } from '../utils/account.utils';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart.comp';
import AgPieChart from '../components/ag-charts/PieChart.comp';

export function AccountCharts(props) {

    const [momentsBySeriesAndTier] = useState(() => getNumMomentsBySeriesAndTier(props.series, props.collection));
    const [editionsBySeriesAndTier] = useState(() => getNumEditionsBySeriesAndTier(props.series, props.editionIDs, props.editionsMap));
    const [momentsByTypeAndTeam] = useState(() => getAgMomentsByTypeAndTeam(props.collection, props.playTypes, TEAMS));

    return (
        <>
            {momentsBySeriesAndTier.length > 0 && editionsBySeriesAndTier.length > 0 &&
                <Row style={{margin: "5px"}}>
                    <Col lg={true} style={{marginBottom: "15px"}}>
                        <div style={{height: "400px"}}>
                            <AgPieChart title={'Moments'} data={momentsBySeriesAndTier.map(s => {
                                return { label: s.name, value: s.TOTAL };
                            })} />
                        </div>
                    </Col>
                    <Col lg={true} style={{marginBottom: "15px"}}>
                        <div style={{height: "400px"}}>
                            <AgPieChart title={'Editions'} data={editionsBySeriesAndTier.map(s => {
                                return { label: s.name, value: s.TOTAL };
                            })} />
                        </div>
                    </Col>
                </Row>
            }
            {momentsByTypeAndTeam.length > 0 &&
                <Row className='bar-chart-container'>
                    <AgStackedBarChart data={momentsByTypeAndTeam} yKeys={props.playTypes} title={'Moment Distribution'} />
                </Row>
            }
        </>
    )

}