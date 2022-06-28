import React, { useState } from "react"
import useTotalSupply from '../hooks/use-total-supply.hook';

export function Home() {

    const [ error, setError ] = useState(null);

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
        </div>
    )

}