import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from '../providers/EditionsProvider.comp';
import { usePlays } from '../providers/PlaysProvider.comp';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AG_EDITION_COLS } from '../constants/ag-grid/editions-columns';
import { getEditionGridData } from '../utils/edition';
import { AgGrid } from '../components/AgGrid';
import { numFormat } from '../utils/num';
import { Series, Set as MySet, Edition } from '../models/models';
import { StatusBadge } from "../components/badges/StatusBadge";
import { TeamBadge } from '../components/badges/TeamBadge';

export function Set() {

    const { seriesID, setID } = useParams();

    const { series } = useSeries();
    const { sets } = useSets();
    const { editionsMap } = useEditions();
    const { playsMap } = usePlays();

    if (!series || !sets || !editionsMap || !playsMap) return (<></>)

    const seriesInfo: Series = series.get(+seriesID);
    const setInfo: MySet = sets.get(+setID);

    const TITLE = seriesInfo.name + ' > ' + setInfo.name;

    const filteredEditions: Edition[] = Array.from(editionsMap.values()).filter(e => e.seriesID === +seriesID && e.setID === +setID);
    const gridData = getEditionGridData(filteredEditions, playsMap);
    const numMintedMoments: number = gridData.reduce((acc, row) => acc += +row.numMinted, 0);
    const cardItems = [
        ['Status', <StatusBadge active={seriesInfo.active} />],
        ['Editions', numFormat(gridData.length)],
        ['Minted Moments', numFormat(numMintedMoments)]
    ];

    return (
        <Container>
            <h4 className='header-color' style={{ marginLeft: '10px' }}>{TITLE}</h4>
            <Row className='three-card-col'>
                {cardItems.length > 0 &&
                    cardItems.map((data, i) => {
                        const [header, body] = data;
                        return (
                            <Col key={i} md={true}>
                                <Card className='shadow' style={{ margin: '20px 10px 0px' }}>
                                    <Card.Header className='header-color' as='h6'>{header}</Card.Header>
                                    <Card.Body as='h5' style={{ textAlign: 'center' }}>{body}</Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            {gridData.length > 0 && <AgGrid components={{ teamRenderer: TeamBadge }} columnDefs={AG_EDITION_COLS} rowData={gridData} />}
        </Container>
    )

}