import { useState } from 'react';
import { Container, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useSeries } from '../providers/SeriesProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { SupplyTable } from '../components/SupplyTable.comp';
import { getSupplyPerSeriesAndTier } from '../utils/supply.utils';
import { Loading } from '../components/Loading.comp';
import { RADIOS } from '../constants/radio-buttons';
import AgPieChart from '../components/ag-charts/PieChart.comp';
import { CardComp } from '../components/Card.comp';

export function Home() {

    const [momentRadio, setMomentRadio] = useState('1');
    const [editionRadio, setEditionRadio] = useState('1');

    const { series } = useSeries();
    const { editionsMap } = useEditions();

    let seriesSupply = null, editionsSupply = null;
    if (!!series && !!editionsMap) {
        seriesSupply = getSupplyPerSeriesAndTier(series, editionsMap, 'moments');
        editionsSupply = getSupplyPerSeriesAndTier(series, editionsMap, 'editions');
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
                    {RADIOS.map((r, id) => (
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

    const filterSupplyArr = (arr, radioVal) => {
        const radio = RADIOS.find(r => r.value === radioVal);
        return arr.map(x => { return {label: x.name, value: x[radio.key]} });
    }

    return (
        <Container>
            {(!series || !editionsMap) && <Loading />}
            {!!series && !!editionsMap && <>
                {!!seriesSupply &&
                    <CardComp header={'Moments'} body={
                        <Row>
                            <Col lg={true}>
                                {createButtons('moment', momentRadio, setMomentRadio)}
                                <AgPieChart data={filterSupplyArr(seriesSupply, momentRadio)} />
                            </Col>
                            <Col lg={true}>
                                <SupplyTable rows={seriesSupply} />
                            </Col>
                        </Row>
                    } />
                }
                {!!editionsSupply &&
                    <CardComp header={'Editions'} body={
                        <Row>
                            <Col lg={true}>
                                {createButtons('edition', editionRadio, setEditionRadio)}
                                <AgPieChart data={filterSupplyArr(editionsSupply, editionRadio)} />
                            </Col>
                            <Col lg={true}>
                                <SupplyTable rows={editionsSupply} />
                            </Col>
                        </Row>
                    } />
                }
            </>}
        </Container>
    )

}