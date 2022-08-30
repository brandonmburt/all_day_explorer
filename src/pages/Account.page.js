import React, { useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getUniqueEditions, getDescriptiveMoments } from '../utils/moment.utils';
import { useEditions } from "../providers/EditionsProvider.comp";
import { usePlays } from "../providers/PlaysProvider.comp";
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { AG_COLLECTION_COLS } from '../constants/ag-grid/collection-columns';
import { AgGrid } from '../components/AgGrid.comp';
import { AccountForm } from "../components/AccountForm.comp";
import { numFormat } from '../utils/num.utils';
import { getCollectionIDs, getCollectionMoments } from '../services/account.service';
import { AccountCharts } from '../components/AccountCharts.comp';

export function Account() {

    const { editionsMap } = useEditions();
    const { playsMap, playTypes } = usePlays();
    const { series } = useSeries();
    const { sets } = useSets();

    const [address, setAddress] = useState(null);
    const [editionIDs, setEditionIDs] = useState([]);
    const [collectionMoments, setCollectionMoments] = useState([]);

    const processSubmit = async (address) => {
        setAddress(address);
        const momentIDs = await getCollectionIDs(address);
        if (momentIDs.length === 0) {
            console.error('No Moments??');
            return;
        }
        const moments = await getCollectionMoments(address, momentIDs);
        let collection = getDescriptiveMoments(moments, editionsMap, playsMap, series, sets);
        setCollectionMoments(collection);
        setEditionIDs(getUniqueEditions(collection));
    };

    const resetForm = () => {
        setAddress(null);
        setEditionIDs([]);
        setCollectionMoments([]);
    }

    return (
        <Container>
            {address === null &&
                <AccountForm processSubmit={processSubmit} />
            }
            {address !== null &&
                <div><Button onClick={resetForm} style={{margin:'30px 30px 0'}} variant='outline-primary'>Look Up Different Address</Button></div>
            }
            {collectionMoments.length > 0 &&
                <Row className='three-card-col'>
                    {[["Flow Address", address], ["Moments Owned", numFormat(collectionMoments.length)],
                        ["Editions Owned", numFormat(editionIDs.length)]].map((data, i) => {
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
            }
            {collectionMoments.length > 0 && editionIDs.length > 0 && !!editionsMap && !!series && !!playTypes &&
                <AccountCharts
                    collection={collectionMoments}
                    editionIDs={editionIDs}
                    editionsMap={editionsMap}
                    series={series}
                    playTypes={playTypes}
                />
            }
            {collectionMoments.length > 0 &&
                <AgGrid columnDefs={AG_COLLECTION_COLS} rowData={collectionMoments} />
            }
        </Container>
    )

}