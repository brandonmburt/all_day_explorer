import React from "react"
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import { usePlays } from "../providers/PlaysProvider.comp";
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Container, Badge, Row, Col, Card } from "react-bootstrap";
import { EDITIONS_COLS } from '../config/editions-columns';

export function Editions() {

    const { seriesID, setID } = useParams();

    const { series } = useSeries();
    const { sets } = useSets();
    const { editions } = useEditions();
    const { plays } = usePlays();

    let title = "", badge = "";
    if (!!series & !!sets) {
        const seriesInfo = series.get(seriesID);
        const setInfo = sets.get(setID);

        title = seriesInfo.name + ": " + setInfo.name;
        badge = seriesInfo.active ?
            <Badge pill bg="success">Active</Badge> :
            <Badge pill bg="danger">Locked</Badge>;
    }

    const gridData = [];
    let numMintedMoments = 0;

    if (!!editions && !!plays) {
        const filteredEditions = editions.filter(e => {
            return e.seriesID === seriesID && e.setID === setID
        });

        filteredEditions.forEach(e => {
            const { id, playID, tier, numMinted, maxMintSize } = e;
            const play = plays.get(playID);
            if (play != null) {
                gridData.push({
                    id,
                    tier,
                    numMinted,
                    maxMintSize,
                    ...play
                });
                numMintedMoments += +numMinted;
            }
        });
    }

    const numEditions = gridData.length;

    return (
        <Container>
            <Row style={{margin: '20px 5px 30px 5px'}}>
                {[["Status", badge], ["Num Editions", numEditions.toLocaleString()],
                    ["Minted Moments", numMintedMoments.toLocaleString()]].map((data, i) => {
                        const [header, body] = data;
                        return (
                            <Col key={i} md={true}>
                                <Card style={{margin: '20px 10px 0px'}}>
                                    <Card.Header as="h6">{header}</Card.Header>
                                    <Card.Body as="h5" style={{textAlign: 'center'}}>{body}</Card.Body>
                                </Card>
                            </Col>
                        )
                })}
            </Row>
            <DataTable
                title={title}
                columns={EDITIONS_COLS}
                data={gridData}
                defaultSortFieldId={1}
                fixedHeader
                highlightOnHover
                progressPending={gridData.length === 0}
                pagination
            />
        </Container>
    )

}