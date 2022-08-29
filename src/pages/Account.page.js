import React, { useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap";
import { query } from "@onflow/fcl";
import { GET_COLLECTION_IDS } from "../scripts/get-collection-ids.script";
import { GET_COLLECTION_MOMENTS } from "../scripts/get-collection-moments.script";
import Button from 'react-bootstrap/Button';
import { getUniqueEditions, getDescriptiveMoments } from '../utils/moment.utils';
import { useEditions } from "../providers/EditionsProvider.comp";
import { usePlays } from "../providers/PlaysProvider.comp";
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { AG_COLLECTION_COLS } from '../constants/ag-grid/collection-columns';
import { AgGrid } from '../components/AgGrid.comp';
import { getNumMomentsBySeriesAndTier, getNumEditionsBySeriesAndTier } from '../utils/account.utils';
import { getAgMomentsByTypeAndTeam } from '../utils/account.utils';
import { TEAMS } from '../constants/teams';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart.comp';
import AgPieChart from '../components/ag-charts/PieChart.comp';
import { AccountForm } from "../components/AccountForm.comp";
import { numFormat } from '../utils/num.utils';

export function Account() {

    const { editionsMap } = useEditions();
    const { playsMap, playTypes } = usePlays();
    const { series } = useSeries();
    const { sets } = useSets();

    const [address, setAddress] = useState(null);
    const [editionIDs, setEditionIDs] = useState([]);
    const [momentsBySeriesAndTier, setMomentsBySeriesAndTier] = useState([]);
    const [editionsBySeriesAndTier, setEditionsBySeriesAndTier] = useState([]);
    const [momentsByTypeAndTeam, setMomentsByTypeAndTeam] = useState([]);

    const handleSubmit = (event) => {
        const addr = event.currentTarget.addr.value;
        if (addr.length === 18 && addr.substr(0,2) === "0x") {
            setAddress(addr);
            getCollectionIDs(addr);
        } else if (addr.length === 16) {
            setAddress("0x" + addr);
            getCollectionIDs("0x" + addr);
        } else {
            console.error('Invalid flow address');
        }
    };

    const getCollectionIDs = async (address) => {
        const ids = await query({
            cadence: GET_COLLECTION_IDS,
            args: (arg, t) => [arg(address, t.Address)]
        }).catch(() => console.log("Error occured getting collection IDs"));
        setColectionIDs(ids);
        getCollectionMoments(address, ids);
    }
    
    const getCollectionMoments = async (address, momentIDs) => {
        if (momentIDs && momentIDs.length === 0) {
            return;
        }
        const moments = await query({
            cadence: GET_COLLECTION_MOMENTS,
            args: (arg, t) => [arg(address, t.Address), arg(momentIDs, t.Array(t.UInt64))]
        }).catch(() => console.log("Error occured getting collection moments"));
        let collection = getDescriptiveMoments(moments, editionsMap, playsMap, series, sets);
        setColectionMoments(collection);
        let ids = getUniqueEditions(moments);
        setEditionIDs(ids);

        setMomentsBySeriesAndTier(getNumMomentsBySeriesAndTier(series, collection));
        setEditionsBySeriesAndTier(getNumEditionsBySeriesAndTier(series, ids, editionsMap));
        let momentsData = getAgMomentsByTypeAndTeam(collection, playTypes, TEAMS)
        setMomentsByTypeAndTeam(momentsData);
    }

    const [collectionIDs, setColectionIDs] = useState([]);
    const [collectionMoments, setColectionMoments] = useState([]);

    const resetForm = () => {
        setAddress(null);
        setEditionIDs([]);
        setMomentsBySeriesAndTier([]);
        setEditionsBySeriesAndTier([]);
        setMomentsByTypeAndTeam([]);
        setColectionIDs([]);
        setColectionMoments([]);
    }

    return (
        <Container>
            {address === null &&
                <AccountForm onSubmit={handleSubmit} />
            }
            {address !== null &&
                <div><Button onClick={resetForm} style={{margin:'30px 30px 0'}} variant='outline-primary'>Look Up Different Address</Button></div>
            }
            {collectionIDs.length > 0 &&
                <Row style={{margin: '20px 5px 30px 5px'}}>
                    {[["Flow Address", address], ["Moments Owned", numFormat(collectionIDs.length)],
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
            {momentsBySeriesAndTier.length > 0 && editionsBySeriesAndTier.length > 0 &&
                <Row style={{margin: "5px"}}>
                    <Col lg={true} style={{marginBottom: "15px"}}>
                        <div style={{height: "400px"}}>
                            <AgPieChart title={'Moments'} data={momentsBySeriesAndTier.map(s => {
                                return { label: s.name, value: s.TOTAL };
                            })} />
                        </div>
                    </Col>
                    <Col lg={true} style={{marginBottom: "15px"}}>
                        <div style={{height: "400px"}}>
                            <AgPieChart title={'Editions'} data={editionsBySeriesAndTier.map(s => {
                                return { label: s.name, value: s.TOTAL };
                            })} />
                        </div>
                    </Col>
                </Row>
            }
            {momentsByTypeAndTeam.length > 0 &&
                <Row className='bar-chart-container'>
                    <AgStackedBarChart data={momentsByTypeAndTeam} yKeys={playTypes} title={'Moment Distribution'} />
                </Row>
            }
            {collectionMoments.length > 0 &&
                <AgGrid columnDefs={AG_COLLECTION_COLS} rowData={collectionMoments} />
            }
        </Container>
    )

}