import React, { useState, useEffect, useRef } from "react"
import useTotalSupply from '../hooks/use-total-supply.hook';
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { useSeries } from '../providers/SeriesProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import PieChart from '../components/PieChart.comp.js';
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
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Series</th>
                                        <th>Common</th>
                                        <th>Rare</th>
                                        <th>Legendary</th>
                                        <th>Ultimate</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seriesTiersSupply !== null &&
                                        seriesTiersSupply.map((row, i) => {
                                            return (
                                            <tr key={i}>
                                                <td>{row.name}</td>
                                                <td>{numFormat(row.COMMON)}</td>
                                                <td>{numFormat(row.RARE)}</td>
                                                <td>{numFormat(row.LEGENDARY)}</td>
                                                <td>{numFormat(row.ULTIMATE)}</td>
                                                <td>{numFormat(row.TOTAL)}</td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
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
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Series</th>
                                        <th>Common</th>
                                        <th>Rare</th>
                                        <th>Legendary</th>
                                        <th>Ultimate</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {editionTiersPerSeries !== null &&
                                        editionTiersPerSeries.map((row, i) => {
                                            return (
                                            <tr key={i}>
                                                <td>{row.name}</td>
                                                <td>{numFormat(row.COMMON)}</td>
                                                <td>{numFormat(row.RARE)}</td>
                                                <td>{numFormat(row.LEGENDARY)}</td>
                                                <td>{numFormat(row.ULTIMATE)}</td>
                                                <td>{numFormat(row.TOTAL)}</td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )

}