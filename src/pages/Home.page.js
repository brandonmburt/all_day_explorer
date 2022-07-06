import React, { useState, useEffect, useRef } from "react"
import useTotalSupply from '../hooks/use-total-supply.hook';
import { Container } from "react-bootstrap";
import { useSeries } from '../providers/SeriesProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import PieChart from '../components/PieChart.comp.js';
import Sunburst from "../components/Sunburst.comp";
import { getSupplyPerSeries } from '../utils/supply.utils.js';

export function Home() {

    const { series } = useSeries();
    const { editions } = useEditions();

    let seriesSupply = null;
    if (!!series && !!editions) {
        seriesSupply = getSupplyPerSeries(series, editions);
    }

    const [ totalSupply ] = useTotalSupply();

    return (
        <Container>
            <h3>
                Moments in existence: {totalSupply}
            </h3>
            {seriesSupply !== null &&
                <PieChart data={seriesSupply} />
            }
            <Sunburst />
        </Container>
    )

}