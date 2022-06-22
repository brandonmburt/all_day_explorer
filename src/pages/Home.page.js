import React, { useState, useEffect } from "react"
import { query } from "@onflow/fcl"
import { GET_ALL_SERIES } from '../scripts/get-all-series.script';

const getAllDaySeries = async () => {
    const res = await query({
      cadence: GET_ALL_SERIES
    });
    return res;
}

export function Home() {
    const [error, setError] = useState(null);
    const [allDayData, setAllDayData] = useState();
    useEffect(() => {
        getAllDaySeries()
        .then((d) => {
            setAllDayData(d);
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
        <h2>
            All Day
        </h2>
    )

}