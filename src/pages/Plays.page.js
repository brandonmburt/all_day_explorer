import React from "react"
import { usePlays } from "../providers/PlaysProvider.comp";
import { Container, Row } from "react-bootstrap";
import { AG_PLAYS_COLS } from '../constants/ag-grid/plays-columns';
import { Loading } from '../components/Loading.comp';
import { getPlaysGridData } from '../utils/plays.utils';
import { AgGrid } from '../components/AgGrid.comp';
import { getAgPlaysByTypeAndTeam } from '../utils/plays.utils';
import { TEAMS } from '../constants/teams';
import AgStackedBarChart from '../components/ag-charts/StackedBarChart.comp';

export function Plays() {

    const { playsMap, playTypes } = usePlays();

    let rowData = [], playsByTeam = [];
    if (!!playsMap && rowData.length === 0) {
        rowData = getPlaysGridData(playsMap);
        playsByTeam = getAgPlaysByTypeAndTeam(playsMap, playTypes, TEAMS);
    }

    return (
        <Container>
            {!playsMap && 
                <Loading />
            }
            {!!playsMap &&
                <>
                    {playsByTeam.length > 0 && playTypes.length > 0 &&
                        <Row style={{height: '600px', marginTop: '30px', marginBottom: '30px'}}>
                            <AgStackedBarChart data={playsByTeam} yKeys={playTypes} title={'Plays Per Team & Type'} />
                        </Row>
                    }
                    {rowData.length > 0 && 
                        <AgGrid columnDefs={AG_PLAYS_COLS} rowData={rowData} />
                    }
                </>
            }
        </Container>
    )

}