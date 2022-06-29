import React from "react"
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import { usePlays } from "../providers/PlaysProvider.comp";

import { useParams } from "react-router-dom"


export function Editions() {

    const { seriesID, setID } = useParams();

    const { series } = useSeries();
    const { sets } = useSets();
    const { editions } = useEditions();
    const { plays } = usePlays();

    const filteredEditions = editions.filter(e => {
        return e.seriesID === seriesID && e.setID === setID
    });

    console.log(filteredEditions);

    return (
        <div>
            <div>
                Series: {seriesID}
            </div>
            <div>
                Set: {setID}
            </div>
            <div>
                {filteredEditions &&
                    filteredEditions.map(e => {
                        return <p>{e.playID}</p>
                    })
                }
            </div>
        </div>
    )

}