import React, { useState } from "react"
import { useSeries } from '../providers/SeriesProvider.comp';
import { useSets } from '../providers/SetsProvider.comp';
import { useEditions } from "../providers/EditionsProvider.comp";
import useTotalSupply from '../hooks/use-total-supply.hook';
import { getSetsWithinSeries } from '../utils/nav.utils';
import { SeriesNav } from "../components/SeriesNav.comp";

export function Home() {
    const { series } = useSeries();
    const { sets } = useSets();
    const { editions } = useEditions();
    const [ error, setError ] = useState(null);

    const [totalSupply] = useTotalSupply();

    let seriesSets = getSetsWithinSeries(series, sets, editions);
    if (seriesSets !== null) {
        console.log(seriesSets);
    }

    if (error != null) {
        return (
            <h3>
                <span>Error Fetching All Day Info: {error}</span>
            </h3>
        )
    }

    return (
        <div>
            <h2>
                Moments in existence: {totalSupply}
            </h2>
            <div>
                {seriesSets !== null &&
                    Array.from(seriesSets).map(([key, val]) => {
                        const s = series.get(key);
                        return <SeriesNav key={key} id={s.id} name={s.name} active={s.active} sets={val} />
                    })
                }
            </div>
        </div>
    )

}