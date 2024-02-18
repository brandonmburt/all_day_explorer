import { useState } from 'react';
import { Container, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useSeries } from '../providers/SeriesProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { SupplyTable } from '../components/SupplyTable';
import { getSupplyPerSeriesAndTier } from '../utils/supply';
import { Loading } from '../components/Loading';
import { RADIOS } from '../constants/radio-buttons';
import AgPieChart from '../components/ag-charts/PieChart';
import { CardComp } from '../components/Card';

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
            <div style={{ overflowX: 'scroll' }}>
                <ToggleButtonGroup
                    size='sm'
                    className='toggle-style'
                    type='radio'
                    name={type + 'Buttons'}
                    value={val}
                    onChange={(v) => func(v)}>
                    {RADIOS.map(({ value, name }, i) => (
                        <ToggleButton
                            className='tier-toggle-btn'
                            key={i}
                            id={`${type}-${i}`}
                            variant='outline-secondary'
                            value={value}
                        >
                            {name}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        );
    }

    const filterSupplyArr = (arr, radioVal) => {
        const radio = RADIOS.find(r => r.value === radioVal);
        return arr.map(x => { return { label: x.name, value: x[radio.key] } });
    }

    return (
        <Container>
            {(!series || !editionsMap) && <Loading />}
            {!!series && !!editionsMap && <>
                {!!seriesSupply &&
                    <CardComp header={'Moments'} body={
                        <Row>
                            <Col lg={6}>
                                {createButtons('moment', momentRadio, setMomentRadio)}
                                <AgPieChart data={filterSupplyArr(seriesSupply, momentRadio)} />
                            </Col>
                            <Col lg={6}>
                                <SupplyTable rows={seriesSupply} />
                            </Col>
                        </Row>
                    } />
                }
                {!!editionsSupply &&
                    <CardComp mb='0' header={'Editions'} body={
                        <Row>
                            <Col lg={6}>
                                {createButtons('edition', editionRadio, setEditionRadio)}
                                <AgPieChart data={filterSupplyArr(editionsSupply, editionRadio)} />
                            </Col>
                            <Col lg={6}>
                                <SupplyTable rows={editionsSupply} />
                            </Col>
                        </Row>
                    } />
                }
            </>}
        </Container>
    )

}