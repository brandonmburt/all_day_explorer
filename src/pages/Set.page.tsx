import React from 'react';
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { usePlays } from '../providers/PlaysProvider.comp';
import { useParams } from 'react-router-dom';
import { Container, Badge, Row, Col, Card } from 'react-bootstrap';
import { AG_EDITION_COLS } from '../constants/ag-grid/editions-columns';
import { getEditionGridData } from '../utils/edition.utils';
import { AgGrid } from '../components/AgGrid.comp';
import { numFormat } from '../utils/num.utils';

export function Set() {

    const { seriesID, setID } = useParams();

    const { series } = useSeries();
    const { sets } = useSets();
    const { editionsMap } = useEditions();
    const { playsMap } = usePlays();

    let title = '', badge = null;
    if (!!series && !!sets) {
        const seriesInfo = series.get(+seriesID);
        const setInfo = sets.get(+setID);

        title = seriesInfo.name + ': ' + setInfo.name;
        badge = seriesInfo.active ?
            <Badge pill bg='success'>Active</Badge> :
            <Badge pill bg='danger'>Closed</Badge>;
    }

    let gridData = [], numMintedMoments = 0, cardItems = [];
    if (!!editionsMap && !!playsMap) {
        const filteredEditions = Array.from(editionsMap.values()).filter(e => e.seriesID === +seriesID && e.setID === +setID);
        gridData = getEditionGridData(filteredEditions, playsMap);
        numMintedMoments = gridData.reduce((acc, row) => acc += +row.numMinted, 0);
        cardItems = [
            ['Status', badge],
            ['Num Editions', numFormat(gridData.length)],
            ['Minted Moments', numFormat(numMintedMoments)]
        ];
    }

    return (
        <Container>
            <Row className='three-card-col'>
                {cardItems.length > 0 &&
                    cardItems.map((data, i) => {
                        const [header, body] = data;
                        return (
                            <Col key={i} md={true}>
                                <Card className='shadow' style={{margin: '20px 10px 0px'}}>
                                    <Card.Header as='h6'>{header}</Card.Header>
                                    <Card.Body as='h5' style={{textAlign: 'center'}}>{body}</Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            {gridData.length > 0 && <>
                <h4>{title}</h4>
                <AgGrid columnDefs={AG_EDITION_COLS} rowData={gridData} />
            </>}
        </Container>
    )

}