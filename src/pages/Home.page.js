import React, { useState, useEffect, useRef } from "react"
import useTotalSupply from '../hooks/use-total-supply.hook';
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { useSeries } from '../providers/SeriesProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import PieChart from '../components/PieChart.comp.js';
import { SupplyTable } from '../components/SupplyTable.comp.js';
import { getSupplyPerSeries, getSupplyPerTier, getSupplyPerSeriesAndTier, getNumEditionsPerSeries, getNumEditionsPerSeriesAndTier } from '../utils/supply.utils.js';

export function Home() {

    const { series } = useSeries();
    const { editions } = useEditions();

    let seriesSupply = null, seriesTiersSupply = null, editionsPerSeries = null, editionTiersPerSeries = null;
    if (!!series && !!editions) {
        seriesSupply = getSupplyPerSeries(series, editions);
        seriesTiersSupply = getSupplyPerSeriesAndTier(series, editions);
        editionsPerSeries = getNumEditionsPerSeries(series, editions);
        editionTiersPerSeries = getNumEditionsPerSeriesAndTier(series, editions);
    }

    let tiersSupply = null;
    if (!!editions) {
        tiersSupply = getSupplyPerTier(editions);
    }

    const [ totalSupply ] = useTotalSupply();

    const numFormat = (num) => num.toLocaleString();

    return (
        <Container>
            <Card style={{margin: '20px 10px 0px'}}>
                <Card.Header as="h5">Moments</Card.Header>
                <Card.Body>
                    <Row>
                        <Col lg={true} >
                            {seriesSupply !== null &&
                                <PieChart data={seriesSupply} />
                            }
                        </Col>
                        <Col lg={true} style={{marginTop: '15px'}}>
                            <h5>
                                Total Moments: {totalSupply ? numFormat(totalSupply) : ''}
                            </h5>
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
                            {editionsPerSeries !== null &&
                                <PieChart data={editionsPerSeries} />
                            }
                        </Col>
                        <Col lg={true} style={{marginTop: '15px'}}>
                            <h5>
                                Total Editions: {editionsPerSeries ? editionsPerSeries.reduce((acc, v) => acc += v.value, 0) : ''}
                            </h5>
                            {editionTiersPerSeries !== null &&
                                <SupplyTable rows={editionTiersPerSeries} />
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )

}