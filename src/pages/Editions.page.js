import React from "react"
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import { usePlays } from "../providers/PlaysProvider.comp";
import { useParams } from "react-router-dom";
import { Container, Badge, Row, Col, Card } from "react-bootstrap";
import { AG_EDITION_COLS } from '../config/editions-columns';
import { getEditionGridData } from '../utils/edition.utils';
import { AgGrid } from "../components/AgGrid.comp";

export function Editions() {

    const { seriesID, setID } = useParams();

    const { series } = useSeries();
    const { sets } = useSets();
    const { editions } = useEditions();
    const { playsMap } = usePlays();

    let title = "", badge = "";
    if (!!series & !!sets) {
        const seriesInfo = series.get(seriesID);
        const setInfo = sets.get(setID);

        title = seriesInfo.name + ": " + setInfo.name;
        badge = seriesInfo.active ?
            <Badge pill bg="success">Active</Badge> :
            <Badge pill bg="danger">Locked</Badge>;
    }

    let gridData = [];
    let numMintedMoments = 0;

    if (!!editions && !!playsMap) {
        const filteredEditions = editions.filter(e => {
            return e.seriesID === seriesID && e.setID === setID
        });

        gridData = getEditionGridData(filteredEditions, playsMap);
        numMintedMoments = gridData.reduce((acc, row) => acc += +row.numMinted, 0);

    }

    return (
        <Container>
            <Row style={{margin: '20px 5px 30px 5px'}}>
                {[["Status", badge], ["Num Editions", (gridData.length).toLocaleString()],
                    ["Minted Moments", numMintedMoments.toLocaleString()]].map((data, i) => {
                        const [header, body] = data;
                        return (
                            <Col key={i} md={true}>
                                <Card className="shadow" style={{margin: '20px 10px 0px'}}>
                                    <Card.Header as="h6">{header}</Card.Header>
                                    <Card.Body as="h5" style={{textAlign: 'center'}}>{body}</Card.Body>
                                </Card>
                            </Col>
                        )
                })}
            </Row>
            {gridData.length > 0 && 
                <>
                    <h4>{title}</h4>
                    <AgGrid columnDefs={AG_EDITION_COLS} rowData={gridData} />
                </>
            }
        </Container>
    )

}