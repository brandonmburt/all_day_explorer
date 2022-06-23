import React, { useState, useEffect } from "react"
import { query } from "@onflow/fcl"
import { GET_ALL_SETS } from '../scripts/get-all-sets.script';
import { GET_ALL_EDITIONS } from '../scripts/get-all-editions.script';
import { useSeries } from '../providers/SeriesProvider.comp';
import useTotalSupply from '../hooks/use-total-supply.hook';

const getAllSets = async () => {
    const res = await query({
      cadence: GET_ALL_SETS
    });
    return res;
}

const getAllEditions = async () => {
    const res = await query({
      cadence: GET_ALL_EDITIONS
    });
    return res;
}

export function Home() {
    const { series } = useSeries();
    const [error, setError] = useState(null);

    const [sets, setSets] = useState([]);
    useEffect(() => {
        getAllSets()
        .then((d) => {
            setSets(d);
        })
        .catch(() => setError(true))
    }, []);

    const [editions, setEditions] = useState([]);
    useEffect(() => {
        getAllEditions()
        .then((d) => {
            setEditions(d);
        })
        .catch(() => setError(true))
    }, []);

    const [totalSupply] = useTotalSupply();

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
                {series.map(x => <p>{x.name}</p>)}
            </div>
        </div>
    )

}