import React from "react"
import { usePlays } from "../providers/PlaysProvider.comp";
import { Container, Row } from "react-bootstrap";
import { AG_PLAYS_COLS } from '../constants/ag-grid/plays-columns';
import StackedBarChart from '../components/d3/StackedBarChart.comp';
import { Loading } from '../components/Loading.comp';
import { getPlaysGridData } from '../utils/plays.utils';
import { AgGrid } from '../components/AgGrid.comp';
import { numPlaysByTypeAndTeam } from '../utils/plays.utils';
import { TEAMS } from '../constants/teams';

export function Plays() {

    const { playsMap, playTypes } = usePlays();

    let rowData = [], playsByTeam = [];
    if (!!playsMap && rowData.length === 0) {
        rowData = getPlaysGridData(playsMap);
        playsByTeam = numPlaysByTypeAndTeam(playsMap, playTypes, TEAMS);
    }

    return (
        <Container>
            {!playsMap && 
                <Loading />
            }
            {!!playsMap &&
                <>
                    <Row>
                        <h6 style={{margin: '20px 0px 0px 20px'}}>Plays Per Team</h6>
                        {playsByTeam.length > 0 && playTypes.length > 0 &&
                            <StackedBarChart data={playsByTeam} types={playTypes} />
                        }
                    </Row>
                    {rowData.length > 0 && 
                        <AgGrid columnDefs={AG_PLAYS_COLS} rowData={rowData} />
                    }
                    </>
            }
        </Container>
    )

}