import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSeries } from '../providers/SeriesProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import PieChart from '../components/d3/PieChart.comp.js';
import { SupplyTable } from '../components/SupplyTable.comp.js';
import { getSupplyPerSeriesAndTier, getNumEditionsPerSeriesAndTier } from '../utils/supply.utils.js';
import { Loading } from '../components/Loading.comp';

export function Home() {

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
                            <Col lg={true} >
                                {seriesTiersSupply !== null &&
                                    <PieChart data={seriesTiersSupply.map(s => ({name: s.name, value: s.TOTAL}))} />
                                }
                            </Col>
                            <Col lg={true} style={{marginTop: '15px'}}>
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
                            <Col lg={true} >
                                {editionTiersPerSeries !== null &&
                                    <PieChart data={editionTiersPerSeries.map(e => ({name: e.name, value: e.TOTAL}))} />
                                }
                            </Col>
                            <Col lg={true} style={{marginTop: '15px'}}>
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