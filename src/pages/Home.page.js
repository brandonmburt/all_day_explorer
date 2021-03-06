import React, { useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { useSeries } from '../providers/SeriesProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import PieChart from '../components/d3/PieChart.comp.js';
import { SupplyTable } from '../components/SupplyTable.comp.js';
import { getSupplyPerSeriesAndTier, getNumEditionsPerSeriesAndTier } from '../utils/supply.utils.js';
import { Loading } from '../components/Loading.comp';
import { RADIOS } from '../constants/radio-buttons';

export function Home() {

    const [momentRadio, setMomentRadio] = useState('1');
    const [editionRadio, setEditionRadio] = useState('1');

    const { series } = useSeries();
    const { editions } = useEditions();

    let seriesTiersSupply = null, editionTiersPerSeries = null;
    if (!!series && !!editions) {
        seriesTiersSupply = getSupplyPerSeriesAndTier(series, editions);
        editionTiersPerSeries = getNumEditionsPerSeriesAndTier(series, editions);
    }

    return (
        <Container>
            {(!series || !editions) &&
                <Loading />
            }
            {(!!series && !!editions) &&
                <><Card style={{margin: '20px 10px 0px'}}>
                    <Card.Header as="h5">Moments</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col lg={true} style={{marginBottom: "15px"}}>
                                <ToggleButtonGroup size="sm" style={{width: "100%", textAlign: 'center', marginBottom: "15px"}}
                                    type="radio" name="momentButtons" value={momentRadio} onChange={(v) => setMomentRadio(v)}>
                                    {RADIOS.map((radio, id) => (
                                        <ToggleButton style={{padding: "5px"}} key={id} id={`moment-${id}`} variant="outline-secondary" value={radio.value} >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                                {seriesTiersSupply !== null &&
                                    <PieChart data={seriesTiersSupply.map(s => {
                                        let radio = RADIOS.find(r => r.value === momentRadio);
                                        return { name: s.name, value: s[radio.key] };
                                    })} />
                                }
                            </Col>
                            <Col lg={true}>
                                {seriesTiersSupply !== null &&
                                    <SupplyTable rows={seriesTiersSupply} />
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card style={{margin: '20px 10px'}}>
                    <Card.Header as="h5">Editions</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col lg={true} style={{marginBottom: "15px"}}>
                                <ToggleButtonGroup size="sm" style={{width: "100%", textAlign: 'center', marginBottom: "15px"}}
                                    type="radio" name="editionButtons" value={editionRadio} onChange={(v) => setEditionRadio(v)}>
                                    {RADIOS.map((radio, id) => (
                                        <ToggleButton style={{padding: "5px"}} key={id} id={`edition-${id}`} variant="outline-secondary" value={radio.value} >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                                {editionTiersPerSeries !== null &&
                                    <PieChart data={editionTiersPerSeries.map(e => {
                                        let radio = RADIOS.find(r => r.value === editionRadio);
                                        return { name: e.name, value: e[radio.key] };
                                    })} />
                                }
                            </Col>
                            <Col lg={true}>
                                {editionTiersPerSeries !== null &&
                                    <SupplyTable rows={editionTiersPerSeries} />
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card></>
            }
        </Container>
    )

}