import React from "react"
import { usePlays } from "../providers/PlaysProvider.comp";
import { Container, Row } from "react-bootstrap";
import { AG_PLAYS_COLS } from '../config/plays-columns';
import StackedBarChart from '../components/d3/StackedBarChart.comp';
import { Loading } from '../components/Loading.comp';
import { getPlaysGridData } from '../utils/plays.utils';
import { AgGrid } from '../components/AgGrid.comp';
import { numPlaysByTypeAndTeam, getUniquePlayTypes } from '../utils/plays.utils';

export function Plays() {

    const { plays } = usePlays();

    let rowData = [], playsByTeam = [], playTypes = [];
    if (!!plays && rowData.length === 0) {
        rowData = getPlaysGridData(plays);
        playsByTeam = numPlaysByTypeAndTeam(plays);
        playTypes = getUniquePlayTypes(playsByTeam);
    }

    return (
        <Container>
            {!plays && 
                <Loading />
            }
            {!!plays &&
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