import { useState } from "react"
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
import { DescriptiveMoment, Moment } from "../models/models";

export function Account() {

    const { editionsMap } = useEditions();
    const { playsMap, playTypes } = usePlays();
    const { series } = useSeries();
    const { sets } = useSets();

    const [address, setAddress] = useState<string>(null);
    const [editionIDs, setEditionIDs] = useState<number[]>([]);
    const [collectionMoments, setCollectionMoments] = useState<DescriptiveMoment[]>([]);
    const [submissionInProgress, setSubmissionInProgress] = useState<boolean>(false);

    const handleSubmit = async (address: string) => {
        setAddress(address);
        setSubmissionInProgress(true);
        try {
            const momentIDs: string[] = await getCollectionIDs(address);
            if (momentIDs.length === 0) {
                console.error('No Moments??');
                return;
            }
            const moments: Moment[] = (await getCollectionMoments(address, momentIDs)).map(m => {
                return {
                    editionID: +m.editionID,
                    id: +m.id,
                    mintingDate: Math.floor(+m.mintingDate),
                    serialNumber: +m.serialNumber,
                    uuid: +m.uuid,
                }
            });
            let collection: DescriptiveMoment[] = getDescriptiveMoments(moments, editionsMap, playsMap, series, sets);
            setCollectionMoments(collection);
            setEditionIDs(getUniqueEditions(collection));
        } catch (e) {
            console.error(e);
        }
        setSubmissionInProgress(false);
    };

    const handleResetForm = () => {
        setAddress(null);
        setEditionIDs([]);
        setCollectionMoments([]);
        setSubmissionInProgress(false);
    }

    const DETAILS_CARDS = collectionMoments.length > 0 ? (
        <Row className='three-card-col'>
            {[
                ["Flow Address", address],
                ["Moments Owned", numFormat(collectionMoments.length)],
                ["Editions Owned", numFormat(editionIDs.length)]
            ].map(([header, body], i) => {
                return (
                    <Col key={i} md={true}>
                        <Card className="shadow" style={{ margin: '20px 10px 0px' }}>
                            <Card.Header className="header-color" as="h6">{header}</Card.Header>
                            <Card.Body as="h5" style={{ textAlign: 'center' }}>{body}</Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    ) : null;

    return !editionsMap || !series || !playTypes ? null : (
        <Container>

            {address === null || submissionInProgress ? (
                <AccountForm submissionInProgress={submissionInProgress} handleSubmit={handleSubmit} />
            ) : (
                <Button onClick={handleResetForm} id='account-reset-btn' variant='outline-primary'>
                    Return to Account Lookup
                </Button>
            )}

            {collectionMoments.length > 0 && editionIDs.length > 0 &&
                <>
                    <div>{DETAILS_CARDS}</div>
                    <AccountCharts
                        collection={collectionMoments}
                        editionIDs={editionIDs}
                        editionsMap={editionsMap}
                        series={series}
                        playTypes={playTypes}
                    />
                    <AgGrid columnDefs={AG_COLLECTION_COLS} rowData={collectionMoments} />
                </>
            }
        </Container>
    );

}