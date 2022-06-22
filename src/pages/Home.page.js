import React, { useState, useEffect } from "react"
import { query } from "@onflow/fcl"
import { GET_ALL_SERIES } from '../scripts/get-all-series.script';
import { GET_ALL_SETS } from '../scripts/get-all-sets.script';
import { GET_ALL_EDITIONS } from '../scripts/get-all-editions.script';
import { GET_TOTAL_SUPPLY } from "../scripts/get-total-supply.script";

const getAllSeries = async () => {
    const res = await query({
      cadence: GET_ALL_SERIES
    });
    return res;
}

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

const getTotalSupply = async() => {
    const res = await query({
        cadence: GET_TOTAL_SUPPLY
    });
    return res;
}

export function Home() {
    const [error, setError] = useState(null);
    const [series, setSeries] = useState([]);
    useEffect(() => {
        getAllSeries()
        .then((d) => {
            setSeries(d);
        })
        .catch(() => setError(true))
    }, []);

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

    const [totalSupply, setTotalSupply] = useState();
    useEffect(() => {
        getTotalSupply()
        .then((d) => {
            setTotalSupply(d);
        })
        .catch(() => setError(true))
    }, []);

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